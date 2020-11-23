import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { ProjectListAPI } from '../classes/project-list-api';
import { Project } from '../classes/project';
import { TaskListAPI } from '../classes/task-list-api';
import { Task } from '../classes/task';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private path:String;

   constructor(private http:HttpClient) {

      /* get Rest-api service 'path' */
      this.path=RestApiService.getPath();
   }

   /* to handle error */
  private handleError(error: HttpErrorResponse) 
  {
     
    if (error.error instanceof ErrorEvent) {
      /* A client-side or network error occurred. */

      console.error('An error occurred:', error.error.message);
      return throwError('client side Error: '+error.error.message);
    } 
    else 
    {
      console.error(
        `Backend returned code: ${error.status}, ` +
        `body was:${error.error.detail},`+
        
        `message was: ${error.message}` );
        
        alert(error.error.detail);
        return throwError(error.error.detail);
        
  }};


   async get_projects():Promise<Project[]>
  {
    let response:HttpResponse<ProjectListAPI>;
   
      response=await this.http.get<ProjectListAPI>(this.path+'api/projects/',
            {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'})
            .pipe(catchError(this.handleError)).toPromise();

      let projectListApi:ProjectListAPI=response.body;

      return projectListApi.results;
          
  }


  /* get individual project details */
  async get_project_by_id(project_id:number):Promise<Project>
  {
    let response:HttpResponse<Project>;
    /* get token */
      response=await this.http.get<Project>(this.path+'api/projects/'+project_id+'/',
            {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'})
            .pipe(catchError(this.handleError)).toPromise();

      let project:Project=response.body;

      return project;
          
  }


  //delete project by id (only manager can delete project)
  delete_project_by_id(project_id:number)
  {
    return this.http.delete(this.path+'api/projects/'+project_id+'/delete/',
      {headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe:'response'}).pipe(catchError(this.handleError))
  } 


  //update project by id
  update_project_by_id(project:Project)
  {
    return this.http.put<Project>(this.path+'api/projects/'+project.id+'/update/',project,
            {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'})
            .pipe(catchError(this.handleError))
  }

  //retrieve task for a particular project
  async get_tasks(project_id:number):Promise<Task[]>
  {
    let response:HttpResponse<TaskListAPI>;
    
      response=await this.http.get<TaskListAPI>(this.path+'api/projects/'+project_id+'/tasks/',
            {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'})
            .pipe(catchError(this.handleError)).toPromise();

      let taskListApi:TaskListAPI=response.body;

      return taskListApi.results;
          
  }

  /* get individual task details (of a project) */
  async get_task_by_id(project_id:number,task_id:number):Promise<Task>
  {
    let response:HttpResponse<Task>;
    /* get token */
      response=await this.http.get<Task>(this.path+'api/projects/'+project_id+'/tasks/'+task_id+'/',
            {headers: new HttpHeaders({'Content-Type': 'application/json'}),observe:'response'})
            .pipe(catchError(this.handleError)).toPromise();

      let task:Task=response.body;

      return task;
          
  }

}
