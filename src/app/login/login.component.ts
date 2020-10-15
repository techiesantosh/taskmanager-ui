import { JsonResponse } from './service/JsonResponse';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isRegisterPage: boolean;
  loginForm: FormGroup;
  private formSubmitAttempt: boolean;
  showError: boolean = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });




  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
  }

    this.authService.login(this.loginForm.value).pipe(first())
      .subscribe(

        (data) => {



          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
          this.router.navigate([redirect]);
        },
        error => {
          this.showError = true;
        }



        // {8}


      );
  }
}
