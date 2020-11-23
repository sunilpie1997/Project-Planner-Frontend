import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from 'src/app/classes/task';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styles: [
  ]
})
export class TaskDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,private projectServive:ProjectService) { }

  task_id:number=null;
  project_id:number=null;

  task:Task=null;

  ngOnInit():void{

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let project_id=parseInt(params.get('project_id'));
      let task_id=parseInt(params.get('task_id'));
      this.task_id=task_id;
      this.project_id=project_id;

      this.retrieve_task();
  });


}

async retrieve_task()
{
  this.task= await this.projectServive.get_task_by_id(this.project_id,this.task_id);
}

}