import { Assignee } from './assignee';

export interface Task {

    id:number;
    name:string;
    description:string;
    start_date:Date;
    end_date:Date;
    assignee:Assignee;
    status:boolean;
    
}