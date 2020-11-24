
export class NewTask {

    id:number;
    name:string;
    description:string;
    start_date:Date;
    end_date:Date;
    status:boolean;
    username:string;

    constructor(
        id:number,name:string,description:string,start_date:Date,end_date:Date,status:boolean=false,username:string=null
    )
    {

        this.id=id;
        this.name=name;
        this.description=description;
        this.start_date=start_date;
        this.end_date=end_date;
        this.username=username;
        this.status=status
    }
 
    set_username(username:string)
    {
        this.username=username;
    }
    
}