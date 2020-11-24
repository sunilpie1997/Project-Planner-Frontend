import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NewTask } from 'src/app/classes/new-task';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  project_id:number=null;

  new_task:NewTask=new NewTask(null,null,null,null,null,null);

  constructor(private route:ActivatedRoute,private projectService:ProjectService) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let project_id=parseInt(params.get('project_id'));
      
      this.project_id=project_id;

  });

  }


  create_task()
  {
    this.projectService.create_new_task(this.project_id,this.new_task).subscribe(resp=>alert("task successfully created"));
  }

}
