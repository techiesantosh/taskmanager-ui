import { ApiUrls } from './../../login/service/ApiUrls';
import { User } from './../../login/User';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient, } from '@angular/common/http';
import { JsonResponse } from 'src/app/login/service/JsonResponse';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
  constructor(private router: Router, private http: HttpClient) {

  }


  isLoggedIn = false;
  redirectUrl: string;
  // store the URL so we can redirect after logging in

  // getUser(): Observable<JsonResponse> {


  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',

  //     })
  //   };

  //   return this.http.get<JsonResponse>(this.url)
  //     .pipe(catchError(this.handleErrorObservable));

  // }

  register(user: User) {
     return this.http.post('http://localhost:8080/users/register', user);



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
