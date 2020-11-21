
export interface User {

    readonly email:string;
    readonly username:string;
    readonly first_name:string;
    readonly last_name:string;
    readonly is_staff:boolean;
    readonly last_login:Date;
}