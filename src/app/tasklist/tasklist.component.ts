// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ComponentFactory } from '@angular/core';
import { TaskResponse } from '../managetask/taskResponse';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  @ViewChild('alertContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<TaskEditComponent>;
  show = false;

  @Input() task: TaskResponse;
  constructor(private resolver: ComponentFactoryResolver) {

    this.task = new TaskResponse();
  }

  ngOnInit() {
  }




  onEditTask(task: TaskResponse) {

    this.container.clear();
    this.show = true;
    const factory: ComponentFactory<TaskEditComponent> = this.resolver.resolveComponentFactory(TaskEditComponent);

    this.componentRef = this.container.createComponent(factory);

    this.componentRef.instance.ref = this.componentRef;
    this.componentRef.instance.cancel.subscribe(data => this.show = data);
    this.componentRef.instance.taskForm.controls['taskName'].setValue(task.taskName);
    this.componentRef.instance.taskForm.controls['priority'].setValue(task.priority);
    this.componentRef.instance.taskForm.controls['parentTask'].setValue(task.parentTask);
    this.componentRef.instance.taskForm.controls['startDate'].setValue(task.startDate);
    this.componentRef.instance.taskForm.controls['endDate'].setValue(task.endDate);
    this.componentRef.instance.rangeValue = task.priority+'';
    this.componentRef.instance.taskId =task.taskId;
    this.componentRef.instance.updatedTask.subscribe(data => {
      this.task = data;
      this.task.taskId = task.taskId;
      this.show =false;
    });
  }
  onTaskUpdate(f: NgForm) {

    // console.log('onTaskUpdate');
  }






}
