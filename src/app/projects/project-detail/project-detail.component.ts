import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/classes/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project_id:number=null;

  show_tasks:boolean=false;

  project:Project=null;
  
  constructor(private route:ActivatedRoute,private projectService:ProjectService) { }

  ngOnInit(): void {

    //obtaining project_id from route parameters
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id=parseInt(params.get('project_id'));
      this.project_id=id;
      
      this.get_project(this.project_id);
    });

   
  }

  view_tasks()
  {
    this.show_tasks=!this.show_tasks;
  }


  async get_project(project_id:number)
  {
    this.project=await this.projectService.get_project_by_id(this.project_id);
  }

  delete_project()
  {
    
      this.projectService.delete_project_by_id(this.project_id).subscribe(resp=>alert("deleted"));
    
  }

}
