import { Component, Input, OnInit } from '@angular/core';
import { NewTask } from 'src/app/classes/new-task';
import { Task } from 'src/app/classes/task';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styles: [`input {
    color:#145374;
    font-weight: bolder;
}`
  ]
})
export class TaskUpdateComponent implements OnInit {

  @Input('task') task:Task;

  new_task:NewTask=null;
  @Input('project_id') project_id:number;

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.new_task=new NewTask(this.task.id,this.task.name,this.task.description,this.task.start_date,this.task.end_date,this.task.status)
    
    if(this.task.assignee!=null)
    {
      this.new_task.set_username(this.task.assignee.username);
    
    }
    
  }

  update_task()
  {
    if(!this.new_task.username)
    {
      this.new_task.username=null;
    }

    this.projectService.update_task_by_id(this.project_id,this.new_task).subscribe(resp=>
      {
        alert("task successfully updated");
      });

  }

}
