import dal from "../Utils/dal_mysql"
import {v4 as uuid} from "uuid";
import { Vacation } from "../Models/vacation"
import { OkPacket } from "mysql";
import safeDelete from "../Utils/self-delete";

const getAllVacations = async (): Promise<Vacation[]> => {
    const sql = `
                SELECT * FROM vacations_db.vacations V
                ORDER BY V.start_date ASC
    `; 
    const vacations = await dal.execute(sql);
    return vacations;
}

const getVacationByID = async (id:number): Promise<Vacation> => {
    const sql = `
        SELECT * FROM vacations_db.vacations
        WHERE vacations.vacation_id = ${id}
    `; 
    const vacation = await dal.execute(sql);
    return vacation;
}


const getVacationsByName = async (name :string): Promise<Vacation[]> => {
    const sql = `
        SELECT * FROM vacations_db.vacations
        WHERE vacations.destination = '${name}'
    `; 
    const vacations = await dal.execute(sql);
    return vacations;
}

const addNewVacation = async (newVacation: Vacation): Promise<Vacation> => {
    const extension = newVacation.image.name.substring(newVacation.image.name.lastIndexOf('.'));
    newVacation.imageName = uuid() + extension;
    await newVacation.image.mv("./images/" + newVacation.imageName);
    delete newVacation.image;

    const sql = `
        INSERT INTO vacations_db.vacations VALUES
        (DEFAULT,
        '${newVacation.description}',
        '${newVacation.destination}',
        '${newVacation.imageName}',
        '${newVacation.start_date}',
        '${newVacation.end_date}',
        ${newVacation.price},
        ${newVacation.sumFollowers})
    `
    const response : OkPacket = await dal.execute(sql);
    newVacation.vacation_id = response.insertId;
    return newVacation;
} 

const deleteVacation = async (id: number): Promise<void> => {
    const sql = `DELETE FROM vacations_db.vacations WHERE vacation_id = ${id}`
    const response = await dal.execute(sql);
}

const updateVacation = async (vacation: Vacation): Promise<Vacation> => {
    if(vacation.image){
        console.log(vacation.imageName);
        safeDelete("./images/" + vacation.imageName);
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf('.'));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./images/" + vacation.imageName);   
    }

    const sql = `
        UPDATE vacations_db.vacations 
        SET description = '${vacation.description}',
        destination = '${vacation.destination}',
        imageName = '${vacation.imageName}',
        start_date = '${vacation.start_date}',
        end_date = '${vacation.end_date}',
        price = ${vacation.price},
        sumFollowers = ${vacation.sumFollowers}
        WHERE vacation_id = ${vacation.vacation_id}
    `;

    delete vacation.image;
    const response : OkPacket = await dal.execute(sql);
    return vacation;
}

export default {
    getAllVacations,
    getVacationByID,
    getVacationsByName,
    addNewVacation,
    deleteVacation,
    updateVacation
}