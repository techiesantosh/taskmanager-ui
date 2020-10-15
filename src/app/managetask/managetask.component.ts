import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { JsonResponse } from 'src/app/task/service/JsonResponse';
import { ManagetaskService } from './service/managetask.service';
import { TaskService } from './../task/service/task.service';
import { Component, OnInit } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-managetask',
  templateUrl: './managetask.component.html',
  styleUrls: ['./managetask.component.css']
})
export class ManagetaskComponent implements OnInit {

  task: string;
  parentTask: string;
  taskList: string[] = [];
  filteredTaskList: string[] = [];
  taskForm: FormGroup;
  jsonResponse: JsonResponse;
  selectedTaskOption: any;
  selectedParentOption: any;
  constructor(private taskService: TaskService) { }

  ngOnInit() {


    // this.taskForm = new FormGroup(
    //   {
    //     taskName: new FormControl('', [Validators.minLength(6)]),
    //     priorityFrom: new FormControl('', [Validators.minLength(6)]),
    //     priorityTo: new FormControl('', [Validators.minLength(6)]),
    //     parentTask: new FormControl('', [Validators.minLength(6)]),
    //     startDate: new FormControl('', [Validators.minLength(6)]),
    //     endDate: new FormControl('', [Validators.minLength(6)])
    //   });


    this.taskService.getTasks().subscribe(resp => {

      this.jsonResponse = resp.body;
      this.taskList = this.taskList.concat(<string[]>this.jsonResponse.result);
      this.filteredTaskList = this.filteredTaskList.concat(<string[]>this.jsonResponse.result);


    }, err => {
      // this.showError = true;
      console.log('onSubmit' + err);
    });

  }

  onTaskSelect(event: TypeaheadMatch): void {
    this.selectedTaskOption = event.item;

  }
  onParentTaskSelect(event: TypeaheadMatch): void {
    this.selectedParentOption = event.item;
  }
  onSubmit() {

    this.taskService.getTasks().subscribe(resp => {

      this.jsonResponse = resp.body;
      this.filteredTaskList = [];
      this.filteredTaskList = this.filteredTaskList.concat(<string[]>this.jsonResponse.result);


    }, err => {
      // this.showError = true;
      console.log('onSubmit' + err);
    });

  }

 

}
