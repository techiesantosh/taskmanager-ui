import { JsonResponse } from './JsonResponse';
import { User } from './../User';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import * as UTIL from 'lodash';
import { environment } from 'src/environments/environment';
import { ApiUrls } from './ApiUrls'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private baserUrl = environment.baseUrl;
  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  isLoggedIn = false;
  redirectUrl: string;
  // store the URL so we can redirect after logging in
  public get currentUserValue(): string {
    return this.currentUserSubject.value.username;
  }
  login(user: User): Observable<boolean> {

    const url = this.baserUrl + ApiUrls.login;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };

    return this.http.post<HttpResponse<JsonResponse>>("http://localhost:8080/login", user, { observe: 'response' })
      .pipe(map(res => {
        if (UTIL.eq(res.ok, true)) {
          let token = res.headers.get('Authorization');
          user.token = token;
          localStorage.setItem('currentUser', JSON.stringify(user, ['username', 'token']));
          this.currentUserSubject.next(user);
          return true;

        }

      }
      )).pipe(catchError(this.handleErrorObservable));

  }


  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
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
