import { Component, OnInit } from '@angular/core';
import { NewProject } from 'src/app/classes/new-project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  new_project:NewProject=new NewProject();

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {}


  create_project()
  {
    this.projectService.create_new_project(this.new_project).subscribe(resp=>alert("project created successfully"));
    
  }


}
