import { Task } from './task';

export interface TaskListAPI {
    
    count:number;
    next: number;
    previous: null;
    results: Task[];
    
}