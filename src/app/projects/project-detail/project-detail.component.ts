import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/classes/project';
import { ProjectAvatar } from 'src/app/classes/project-avatar';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project_id:number=null;

  /* when user clicks on 'view task' button  */
  show_tasks:boolean=false;

  /* when user clicks on 'update' button for each project */
  edit_project:boolean=false;

  project:Project=null;

  projectAvatar:ProjectAvatar=null;

  /* error in image (that is going to be uploaded ) */
  public is_error:boolean=false;

  /* image file */
  public imagefile:File=null;

  
  constructor(private route:ActivatedRoute,private projectService:ProjectService) { }

  ngOnInit(): void {

    //obtaining project_id from route parameters
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id=parseInt(params.get('project_id'));
      this.project_id=id;
      
      this.get_project(this.project_id);

      this.get_project_avatar();
    });

   
  }

  /* toggle tasks list */
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

  /* show 'project-update' component */
  update_project()
  {
    this.edit_project=!this.edit_project;
  }

  async get_project_avatar()
  {
    this.projectAvatar= await this.projectService.get_project_avatar(this.project_id);
  }



  /* when user selects image for upload */
  onFileSelect(event) {
    if (event.target.files.length > 0) {

      const file:File= event.target.files[0];
      if(file.size<=50000){//100  kb....
        
        console.log(file.size)
        this.imagefile=file;
        this.is_error=false;
      }
      
      else
      this.is_error=true;
    }
      else
      this.is_error=true;
    
  }


  //update project avatar image
  onSubmit(){
  
    if(!this.is_error && this.imagefile!=null){
      let filename=this.imagefile.name;
      
      /* new instance of formData containing iamge to be send */
      let formData:FormData=new FormData();
      formData.append('file',this.imagefile);
      
      this.projectService.updateProjectAvatar(this.project_id,formData,filename).subscribe(resp=>
        alert("project avatar image successfull uploaded")
        );

      }

    }



  }