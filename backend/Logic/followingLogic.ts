import dal from "../Utils/dal_mysql"
import { Following } from "../Models/following"
import { OkPacket } from "mysql";
import { Vacation } from "../Models/vacation";

const getAllFollowingForUser = async (user_name: string): Promise<Vacation[]> => {
    const sql = `
        SELECT V.*
        FROM vacations_db.users U 
        INNER JOIN vacations_db.following F ON U.user_name = F.user_name 
        INNER JOIN vacations_db.vacations V ON F.vacation_id = V.vacation_id
        WHERE U.user_name = '${user_name}'
    `; 
    const following = await dal.execute(sql);
    return following;
}

const addNewFollowing = async(newFollowing: Following): Promise<Following> => {
    const sql = `
        INSERT INTO vacations_db.following VALUES
        (DEFAULT,
         '${newFollowing.user_name}',
         ${newFollowing.vacation_id})
    `;
    const sql2 = `
        UPDATE vacations_db.vacations V
        SET V.sumFollowers = V.sumFollowers + 1
        WHERE V.vacation_id =  ${newFollowing.vacation_id}
    `;
    const response : OkPacket = await dal.execute(sql);
    newFollowing.id = response.insertId;
    await dal.execute(sql2);
    return newFollowing;
}

const deleteFollowing = async (user_name: string, vacation_id: number): Promise<void> => {
    const sql = `
        DELETE FROM vacations_db.following 
        WHERE user_name = '${user_name}' AND vacation_id = ${vacation_id} AND id <> 0
    `;
    const sql2 = `
        UPDATE vacations_db.vacations V
        SET V.sumFollowers = V.sumFollowers - 1
        WHERE V.vacation_id =  ${vacation_id}
    `;
    await dal.execute(sql);
    await dal.execute(sql2);
}


export default {
    getAllFollowingForUser,
    addNewFollowing,
    deleteFollowing
}


