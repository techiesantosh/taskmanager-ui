import { TaskRequest } from './../taskRequest';
import { AuthService } from './../../login/service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { TaskForm } from '../TaskForm';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JsonResponse } from './JsonResponse';
import { TaskResponse } from 'src/app/managetask/taskResponse';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private createTaskRestEndpoint = 'http://localhost:8080/taskmanager/createtask';
  private getTaskRestEndpoint = 'http://localhost:8080/taskmanager/gettasks/';
  private updateTaskEndpoint = 'http://localhost:8080/taskmanager/updatetask/';
  constructor(private http: HttpClient, private authService: AuthService,private datePipe:DatePipe) { }

  createTask(taskForm: TaskForm): Observable<HttpResponse<JsonResponse>> {
    let taskRequest = new TaskRequest();
    taskRequest.taskName = taskForm.taskName;
    taskRequest.parentTaskId = taskForm.parentTaskId;
    taskRequest.endDate = this.datePipe.transform( taskForm.endDate, 'yyyy-MM-dd');
    taskRequest.startDate = this.datePipe.transform( taskForm.startDate, 'yyyy-MM-dd');
    taskRequest.priority = taskForm.priority;
    taskRequest.username = this.authService.currentUserValue;

    return this.http
      .post<JsonResponse>(this.createTaskRestEndpoint, taskRequest, {

        observe: 'response'
      })
      .pipe(catchError(this.handleErrorObservable));

  }

  getTasks(): Observable<HttpResponse<JsonResponse>> {
    const endpoint = this.getTaskRestEndpoint + this.authService.currentUserValue;

    return this.http
      .get<JsonResponse>(endpoint, {

        observe: 'response'
      })
      .pipe(catchError(this.handleErrorObservable));

  }

  updateTask (taskForm: TaskForm,taskId:number):Observable<HttpResponse<JsonResponse>> {

    let taskRequest = new TaskRequest();
    taskRequest.taskName = taskForm.taskName;
    taskRequest.parentTaskId = taskForm.parentTaskId;
    taskRequest.endDate = this.datePipe.transform( taskForm.endDate, 'yyyy-MM-dd');
    taskRequest.startDate = this.datePipe.transform( taskForm.startDate, 'yyyy-MM-dd');
    taskRequest.priority = taskForm.priority;
    taskRequest.username = this.authService.currentUserValue;
    return this.http.put<JsonResponse>(this.updateTaskEndpoint+taskId, taskRequest, {

      observe: 'response'
    })
    .pipe(catchError(this.handleErrorObservable));
  }


  private handleErrorObservable(err: HttpErrorResponse | any) {
    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    console.log('handleErrorObservable called');
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log('An error occurred:', err.message);
      console.log(
        `Backend returned code ${err.status}, body was: ${err.error}`
      );
    }
    return throwError(err.message);
  }
}
