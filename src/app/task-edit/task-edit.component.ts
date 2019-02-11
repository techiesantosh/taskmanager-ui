import { TaskResponse } from 'src/app/managetask/taskResponse';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Input() taskId: string;
  @Output() cancel = new EventEmitter<boolean>();
  @Output() updatedTask = new EventEmitter<TaskResponse>();
  ref: any;
  taskForm: FormGroup;
  rangeValue = '0';
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {

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
    this.modalRef = this.modalService.show(template);
    this.updatedTask.emit(f.value);
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
