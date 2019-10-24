import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "list",
    pathMatch: "full"
  },
  {
    path: "list",
    component: ListTasksComponent
  },
  {
    path: "details/:id",
    component: TaskDetailComponent
  }
]

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
