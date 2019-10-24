import { Component, OnInit } from '@angular/core';
import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/models/task';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  tasksList: Task[];
  task: Task;
  id: number;
  

  constructor(
    private taskData: TasksService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  delete(task: Task): void {
    this.taskData.deleteTask(task).subscribe(() => this.goBack());
    alert("Item Deleted!");

  }

  

  goBack(): void {
    this.location.back();
  }

  update(): void {
    this.taskData.updateTask(this.task).subscribe();
    alert("Item Updated!");
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params["id"];
      this.taskData
      .getTaskById(this.id)
      .subscribe(t => this.task = t);
    });
  }

}
