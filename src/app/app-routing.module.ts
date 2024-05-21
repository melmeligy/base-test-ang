import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DetailsComponent } from './details/details.component';
import { DiscussionComponent } from './discussion/discussion.component';


const routes: Routes = [
  {path: "", component: LandingComponent},
  {path: "details/:buildingno/:flatno", component: DetailsComponent},
  {path: "discussion", component: DiscussionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
