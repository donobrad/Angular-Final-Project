import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/models/task';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {
  tasksList: Task[];
  newTask: Task = new Task();
  tasksUrl = 'http://localhost:3000/tasks';
  task: Task;



  constructor(private tasksData: TasksService, private http: HttpClient) {
    this.tasksData.getTasks().subscribe(t => (this.tasksList = t));

  }


  newJob() {
    this.http.post(this.tasksUrl, this.newTask).toPromise().then(() => {
      alert("Item added. Refresh page to see it.");
    });
  };
  

  delete(task: Task): void {
    this.tasksList = this.tasksList.filter(t => t !== task);
    this.tasksData.deleteTask(task).subscribe();
    alert("Task Deleted!");
  }



  ngOnInit() {

  }

}
