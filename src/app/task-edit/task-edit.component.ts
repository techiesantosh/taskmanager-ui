import { TaskResponse } from 'src/app/managetask/taskResponse';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { TaskService } from '../task/service/task.service';
import { JsonResponse } from '../task/service/JsonResponse';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  providers: [ DatePipe ]
})
export class TaskEditComponent implements OnInit {
  //@Input() taskId: string;
  taskId: number;
  @Output() cancel = new EventEmitter<boolean>();
  @Output() updatedTask = new EventEmitter<TaskResponse>();
  ref: any;
  taskForm: FormGroup;
  rangeValue = '0';
  modalRef: BsModalRef;
  jsonResponse: JsonResponse;
  constructor(private taskService : TaskService,private modalService: BsModalService,private datePipe: DatePipe) {

    this.taskForm = new FormGroup(
      {
        taskName: new FormControl('', [Validators.minLength(6)]),
        priority: new FormControl('0', [Validators.minLength(6)]),
        parentTask: new FormControl('', [Validators.minLength(6)]),
        startDate: new FormControl('', [Validators.minLength(6)]),
        endDate: new FormControl('', [Validators.minLength(6)])
      });
  }

  ngOnInit() {

  }
  onSubmit(f: NgForm, template: TemplateRef<any>) {

    console.log('onsubmit called' + f.value);
    f.control.get('startDate').setValue( this.datePipe.transform( f.control.get('startDate').value, 'yyyy-MM-dd'));
    f.control.get('endDate').setValue( this.datePipe.transform( f.control.get('endDate').value, 'yyyy-MM-dd'));

    this.modalRef = this.modalService.show(template);


    this.taskService.updateTask(f.value,this.taskId).subscribe(resp => {

      this.jsonResponse = resp.body;
      this.updatedTask.emit(f.value);

    }, err => {
      // this.showError = true;
      
      console.log('onSubmit' + err );
    });
  
    this.cancel.emit(false);

    this.ref.destroy();


  }

  removeObject(remove: boolean) {
    console.log('removeObject' + remove);
    this.cancel.emit(remove);
    this.ref.destroy();
  }

  onRangeChange(value: string) {
    this.rangeValue = value;
    console.log(value);

  }




}
