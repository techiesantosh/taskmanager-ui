import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { ManagetaskComponent } from './managetask/managetask.component';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { AlertComponent, AlertModule } from 'ngx-bootstrap/alert';
const appRoutes: Routes = [
  { path: 'addtask', component: TaskComponent },
  { path: 'managetask', component: ManagetaskComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ManagetaskComponent,
    TasklistComponent,
    TaskEditComponent

  ],
  entryComponents: [TaskEditComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),

    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TypeaheadModule,
    AlertModule.forRoot() ,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
