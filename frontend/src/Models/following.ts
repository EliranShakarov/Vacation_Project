export class Following {
    public id: number = 0;
    public user_name: string = "";
    public vacation_id: number = 0;

    constructor(id: number, user_name: string,vacation_id:number){
        this.id = id;
        this.user_name = user_name;
        this.vacation_id = vacation_id;
    }
}