import { UploadedFile } from "express-fileupload";

export class Vacation{
    public vacation_id: number = 0;
    public description: string = "";
    public destination: string = "";
    public imageName: string;
    public image: UploadedFile;
    public start_date: Date = new Date();
    public end_date: Date = new Date();
    public price: number = 0;
    public sumFollowers: number = 0; 
}