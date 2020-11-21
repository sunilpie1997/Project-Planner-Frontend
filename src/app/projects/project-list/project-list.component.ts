import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/classes/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects_list:Project[]
  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {

    this.getAllProjects();
  }

  async getAllProjects()
  {
    this.projects_list=await this.projectService.get_projects();
  }
}
