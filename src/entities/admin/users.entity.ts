import { Validators } from "../../decorators";

export default class UsersEntity {
    public id: number;

    @Validators({AllowNull: false, StringLength: 50})
    public user_name: string;

    @Validators({AllowNull: false, StringLength: 400})
    public password: string;

    public created_at?: Date;
    public last_login?: Date;
    constructor(id: number, user_name: string, password: string, created_at?: Date, last_login?: Date) {
        this.id = id;
        this.user_name = user_name;
        this.password = password;
        this.created_at = created_at;
        this.last_login = last_login;
    }
}