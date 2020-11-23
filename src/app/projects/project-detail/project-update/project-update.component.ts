import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/classes/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {

  @Input('project') project:Project;

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {}

  update_project()
  {
    this.projectService.update_project_by_id(this.project).subscribe(resp=>
      {
        alert("project successfully updated");
      });

  }

}
