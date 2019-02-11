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

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private createTaskRestEndpoint = 'http://localhost:8080/taskmanager/createtask';
  private getTaskRestEndpoint = 'http://localhost:8080/taskmanager/gettasks';
  constructor(private http: HttpClient) { }

  createTask(taskForm: TaskForm): Observable<HttpResponse<JsonResponse>> {



    return this.http
      .post<JsonResponse>(this.createTaskRestEndpoint, taskForm, {

        observe: 'response'
      })
      .pipe(catchError(this.handleErrorObservable));

  }

  getTasks(): Observable<HttpResponse<JsonResponse>> {

    return this.http
      .get<JsonResponse>(this.getTaskRestEndpoint, {

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
