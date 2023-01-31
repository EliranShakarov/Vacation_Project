import { ClientError } from './../Models/client-errors';
import dal from "../Utils/dal_mysql"
import { v4 as uuid } from "uuid";
import { User } from "../Models/user"
import { OkPacket } from "mysql";
import { UserCredentials } from "../Models/credentials-model";
import jwtHelper from '../Utils/jwt-helper';
import cryptoHelper from '../Utils/crypto-helper';

const registerAsync = async (newUser: User): Promise<string> => {
    const isTaken = await checkUserName(newUser.user_name);
    if(isTaken){
        throw new ClientError(400, `Username ${newUser.user_name} already taken`);
    }

    newUser.password = cryptoHelper.hash(newUser.password);
    newUser.unique_id = uuid();
    const sql = `
        INSERT INTO vacations_db.users VALUES
        (DEFAULT,
        '${newUser.unique_id}',
        '${newUser.first_name}',
        '${newUser.last_name}',
        '${newUser.user_name}',
        '${newUser.password}',
        ${newUser.role})
    `
    const response : OkPacket = await dal.execute(sql);
    newUser.id = response.insertId;
    newUser.sumLikes = 0;
    delete newUser.password;
    const token = jwtHelper.getNewToken(newUser);
    return token;
}

async function checkUserName (userName: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) AS count FROM vacations_db.users WHERE user_name = '${userName}'`;
    const response = await dal.execute(sql);
    return response[0].count !== 0;
}

const loginAsync = async (userCred: UserCredentials): Promise<string> => {
    userCred.password = cryptoHelper.hash(userCred.password);
    const sql = `
        SELECT * FROM vacations_db.users
        WHERE users.user_name='${userCred.user_name}' AND users.password='${userCred.password}'
    `
    const sql2 = `
        SELECT count(*) AS count
        FROM vacations_db.following F
        WHERE F.user_name = '${userCred.user_name}'
    `
    const user: User[] = await dal.execute(sql);
    if(user.length === 0){
        throw new ClientError(401,"Incorrect User name or password.");
    }
    else{
        const sumLikes: number = await dal.execute(sql2);
        user[0].sumLikes = sumLikes[0].count;

        delete user[0].password
        const token = jwtHelper.getNewToken(user[0]);
        return token;
    }
}

const relogUser = async (token: string): Promise<string> => {
    // const isValid = await jwtHelper.verifyTokenAsync((token) as any);
    // if(!isValid){
    //     throw new ClientError(401, "Invalid or expired token");
    // }else{
        const oldUser: User = jwtHelper.getUserFromToken(token);
        const sql = `
            SELECT * FROM vacations_db.users
            WHERE users.user_name='${oldUser.user_name}'
        `
        const sql2 = `
            SELECT count(*) AS count
            FROM vacations_db.following F
            WHERE F.user_name = '${oldUser.user_name}'
        `
        const updatedUser: User[] = await dal.execute(sql);
        if(updatedUser.length === 0){
            throw new ClientError(401,"Some error with user name");
        }
        else{
            const sumLikes: number = await dal.execute(sql2);
            updatedUser[0].sumLikes = sumLikes[0].count;

            delete updatedUser[0].password
            const token = jwtHelper.getNewToken(updatedUser[0]);
            return token;
        }
    // }
}


export default {
    registerAsync,
    loginAsync,
    relogUser
}