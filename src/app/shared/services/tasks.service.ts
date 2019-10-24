import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from '../models/task';
import { MessageServiceService } from '../services/message-service.service';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksUrl = 'http://localhost:3000/tasks';
  task: Task[];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageServiceService) { }
  

  getTasks = (): Observable<Task[]> => {
    return this.http.get<Task[]>(this.tasksUrl)
    .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  };

  getTaskById<Data>(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/?id=${id}`;
    return this.http.get<Task[]>(url)
    .pipe(
      map(tasks => tasks[0]),
      tap(t => {
        const outcome = t ? `fetched` : `did not find`;
        this.log(`${outcome} task id=${id}`);
      }),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  deleteTask (task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  updateTask (task: Task): Observable<any> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;
    
    return this.http.put(url, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );;
  }

  addTask (task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
  
  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }

}
