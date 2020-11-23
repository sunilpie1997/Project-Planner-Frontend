import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectUpdateComponent } from './projects/project-detail/project-update/project-update.component';
import { TaskListComponent } from './projects/project-detail/task-list/task-list.component';
import { TaskDetailComponent } from './projects/project-detail/task-list/task-detail/task-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {'path':'',redirectTo:'/login',pathMatch:'full'},
  {'path':'login',component:AuthenticationComponent},
  {'path':'projects',component:ProjectListComponent},
  {'path':'projects/:project_id',component:ProjectDetailComponent},
  {'path':'projects/:project_id/tasks/:task_id',component:TaskDetailComponent},
  {'path':'**',component:PageNotFoundComponent}

  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent=[
  AuthenticationComponent,
  ProjectListComponent,
  ProjectDetailComponent,
  ProjectUpdateComponent,
  TaskListComponent,
  TaskDetailComponent,
  PageNotFoundComponent

  
]

