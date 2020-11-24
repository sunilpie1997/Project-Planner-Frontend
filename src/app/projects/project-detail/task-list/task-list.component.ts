import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/classes/task';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styles: [`
  .page-icon {

    background-color:#495464;
    color: white;
    border-radius: 0.50rem;
    margin:0.5rem;
    border-radius: 0.50rem;
  }
  `
  ]
})
export class TaskListComponent implements OnInit {

  constructor(private projectService:ProjectService) { }

  @Input('project_id') project_id:number;

  page_no:number=1;

  tasks_list:Task[]=[];

  ngOnInit(): void {

      this.retrieve_tasks();
    }


  async retrieve_tasks()
  {
    this.tasks_list= await this.projectService.get_tasks(this.project_id,this.page_no);
  }

    //increase page_no
    increase_page()
    {
      this.page_no=this.page_no+1;
      this.retrieve_tasks();
    }
  
    //decrease page_no
    decrease_page()
    {
      this.page_no=this.page_no-1;
      this.retrieve_tasks();
  
    }

}
