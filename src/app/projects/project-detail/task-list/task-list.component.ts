import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/classes/task';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styles: [
  ]
})
export class TaskListComponent implements OnInit {

  constructor(private projectService:ProjectService) { }

  @Input('project_id') project_id:number;

  tasks_list:Task[]=[];

  ngOnInit(): void {

      this.retrieve_tasks(this.project_id);
    }


  async retrieve_tasks(project_id:number)
  {
    this.tasks_list= await this.projectService.get_tasks(project_id);
  }


}
