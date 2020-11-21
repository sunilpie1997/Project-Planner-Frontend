import { Project } from './project';

export interface ProjectListAPI {
    
    count:number;
    next: number;
    previous: null;
    results: Project[];
    
}