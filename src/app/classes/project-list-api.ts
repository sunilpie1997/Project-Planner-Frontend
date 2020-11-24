import { Project } from './project';

/* Django rest framework' default 'ListAPI' gives results in this form */
export interface ProjectListAPI {
    
    count:number;
    next: number;
    previous: null;
    results: Project[];
    
}