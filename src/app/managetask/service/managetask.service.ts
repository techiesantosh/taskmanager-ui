import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TaskForm } from 'src/app/task/TaskForm';
import { Observable, throwError } from 'rxjs';
import { JsonResponse } from 'src/app/task/service/JsonResponse';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagetaskService {


  private taskRestEndpoint = 'http://localhost:8080/taskmanager/gettasks';
  constructor(private http: HttpClient) { }

  getTasks(): Observable<HttpResponse<JsonResponse>> {

    return this.http
      .get<JsonResponse>(this.taskRestEndpoint, {

        observe: 'response'
      })
      .pipe(catchError(this.handleErrorObservable));

  }

  searchTasks(): Observable<HttpResponse<JsonResponse>> {

    return this.http
      .get<JsonResponse>(this.taskRestEndpoint, {

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
