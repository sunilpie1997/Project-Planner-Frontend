import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectUpdateComponent } from './projects/project-detail/project-update/project-update.component';


const routes: Routes = [
  {'path':'login',component:AuthenticationComponent},
  {'path':'projects',component:ProjectListComponent},
  {'path':'projects/:id',component:ProjectDetailComponent},
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

  
]

