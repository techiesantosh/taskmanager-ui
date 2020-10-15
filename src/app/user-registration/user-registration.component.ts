import { AlertService } from 'src/app/_services/alert.service';
import { first } from 'rxjs/operators';
import { UserService } from './../user/service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  isLoginPage: boolean;
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
 
    });
    console.log('UserRegistrationComponent ngOnInit ');
    this.isLoginPage = false;
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log('Login on submit called');
    this.alertService.clear();

   
 // stop here if form is invalid
 if (this.registerForm.invalid) {
  return;
}
    console.log('before calling register ');
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(data => {

        this.alertService.success('Registration Successful!!', true);

        this.router.navigate(['/login']);

      }, error => {
        this.alertService.error(error);
      });


  }
}
