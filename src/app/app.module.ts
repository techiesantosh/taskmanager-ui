import { HeaderComponent } from './header/header.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { ManagetaskComponent } from './managetask/managetask.component';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TaskSearchPipe } from './helpers/task-search-pipe';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth-guard';
import { AlertComponent } from './directives/alert/alert.component';
import { DatePipe } from '@angular/common';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: UserRegistrationComponent
  },
  {
    path:'home',
    redirectTo:'home/addtask'
},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: 'addtask',
            component: TaskComponent
          },
          {
            path: 'managetask',
            component: ManagetaskComponent
          }

        ]
      }
    ]
  },

];
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ManagetaskComponent,
    TasklistComponent,
    TaskEditComponent,
    TaskSearchPipe,
    LoginComponent,
    UserRegistrationComponent,
    HomeComponent,
    HeaderComponent,
    AlertComponent
  ],
  entryComponents: [TaskEditComponent],
  imports: [
    TypeaheadModule.forRoot(),

    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TypeaheadModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    BsModalService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
