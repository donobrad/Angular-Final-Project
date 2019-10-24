import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';




@NgModule({
  declarations: [
    AppComponent, ListTasksComponent, TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
