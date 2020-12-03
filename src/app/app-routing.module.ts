import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatechecklistComponent } from './createchecklist/createchecklist.component';

const routes: Routes = [
  {path: 'createchecklist', component:CreatechecklistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [CreatechecklistComponent]
