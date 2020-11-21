import { Assignee } from './assignee';

export interface Task {

    readonly name:string;
    readonly description:string;
    readonly start_date:Date;
    readonly end_date:Date;
    readonly assignee:Assignee;
    readonly status:boolean;
    
}