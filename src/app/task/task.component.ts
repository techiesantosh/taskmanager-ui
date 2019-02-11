import { Alert } from './Alert';
import { TaskResponse } from './../managetask/taskResponse';
import { JsonResponse } from './service/JsonResponse';
import { TaskService } from './service/task.service';
import { Component, OnInit } from '@angular/core';
import { TaskForm } from './TaskForm';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { DateComparator } from '../helpers/date-comparator.validator';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  jsonResponse: JsonResponse;
  minStartDate: Date;
  maxStartDate: Date;
  minEndDate:Date;
  maxEndDate:Date;
  selectedParentOption: TaskResponse;
  taskList: TaskResponse[] = [];
  rangeValue = '0';
  submitted = false;
  success = false;
  error = false;

  alerts: Alert[] = [];
  constructor(private taskService: TaskService, private formBuilder: FormBuilder) {

    this.minStartDate = new Date();
    this.maxStartDate = new Date();
    this.maxStartDate.setDate(this.minStartDate.getDate() + 30);

    this.minEndDate = new Date();
    this.maxEndDate = new Date();
    this.maxEndDate.setDate(this.maxEndDate.getDate() + 30);

  }

  ngOnInit() {

    this.taskForm = this.formBuilder.group(
      {
        taskName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        priority: ['0', [Validators.minLength(1)]],
        parentTask: [''],
        startDate: ['', [Validators.required, Validators.minLength(10)]],
        endDate: ['', [Validators.required, Validators.minLength(10)]]
      }, {
        validator: DateComparator('startDate', 'endDate')
    });


    this.taskService.getTasks().subscribe(resp => {

      this.jsonResponse = resp.body;
      this.taskList = this.taskList.concat(<TaskResponse[]>this.jsonResponse.result);


    }, err => {
      // this.showError = true;
      console.log('onSubmit' + err);
    });




  }

  onEndDateValueChange(value: Date): void {
    this.maxStartDate=value;
  }

  get f() { return this.taskForm.controls; }

  reset(): void {
    console.log('reset');
    this.taskForm.reset();
    this.taskForm.controls['priority'].patchValue(0);
    this.rangeValue = '0';
  }

  onRangeChange(value: string) {
    this.rangeValue = value;
    console.log(value);

  }


  onParentTaskSelect(event: TypeaheadMatch): void {
    this.selectedParentOption = event.item;
    //
  }


  onSubmit() {
    // if (this.taskForm.valid) {
    // tslint:disable-next-line:comment-format
    //this.taskForm.reset({ parentTaskId: { value: this.selectedParentOption.taskId } });

    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    console.log('onSubmit called');
    // tslint:disable-next-line:no-unused-expression
    let task1 = new TaskForm();
    task1 = this.taskForm.value;
    if (this.selectedParentOption !== undefined) {
      task1.parentTaskId = this.selectedParentOption.taskId;
    }
    this.taskService.createTask(task1).subscribe(resp => {

      this.jsonResponse = resp.body;
      this.alerts.pop();
      this.alerts.push({
        type: 'info',
        msg: `Task created successfully`,
        timeout: 2000
      });



    }, err => {
      // this.showError = true;
      this.alerts.pop();
      this.alerts.push({
        type: 'danger',
        msg: `Task creation Failed`,
        timeout: 1000
      });

      console.log('onSubmit' + err + this.error + this.success);
    });


    // }
  }

}
