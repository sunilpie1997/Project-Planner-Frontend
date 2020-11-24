import { Manager } from './manager';

export interface Project {

     id:number;
     name:string;
     description:string;
     start_date:Date;
     end_date:Date;
     manager:Manager;
    
}