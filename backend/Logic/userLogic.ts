import { ClientError } from './../Models/client-errors';
import dal from "../Utils/dal_mysql"
import { User } from "../Models/user"
import { OkPacket } from "mysql";

const getAllUsers = async (): Promise<User[]> => {
    const sql = `SELECT * FROM vacations_db.users`; 
    const users = await dal.execute(sql);
    return users;
}


const getSingleUser = async (unique_id: string): Promise<User> => {
    const sql = `
        SELECT * FROM vacations_db.users
        WHERE users.unique_id = '${unique_id}'
    `; 
    const user = await dal.execute(sql);
    if(user.length === 0){
        throw new ClientError(401, "Incorrect User");
    } 
    delete user[0].password;
    return user;
}


export default {
    getAllUsers,
    getSingleUser,
}