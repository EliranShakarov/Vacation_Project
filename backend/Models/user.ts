import Role from "./role";

export class User {
    public id: number = 0;
    public unique_id: string = "";
    public first_name: string = "";
    public last_name: string = "";
    public user_name: string = "";
    public password: string = "";
    public role: Role;
    public sumLikes: number = 0;
}


