import { Manager } from './manager';

export interface Project {

    readonly id:number;
    readonly name:string;
    readonly description:string;
    readonly start_date:Date;
    readonly end_date:Date;
    readonly manager:Manager;
    
}