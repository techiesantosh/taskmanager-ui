import {Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'tasksearch',
})
export class TaskSearchPipe implements PipeTransform {
    // tslint:disable-next-line:max-line-length
    transform(_taskList: any, taskName: string, parentTask: string, priorityFrom: number, priorityTo: number, startDate: string, endDate: string) {
      let taskflag , parentFlag ,  priorityFromFlag, priorityToFlag;
        if (_taskList && _taskList.length) {
            return _taskList.filter(item => {
                taskflag = true;
                parentFlag = true;
                priorityFromFlag = true;
                priorityToFlag = true;

                if (taskName && item.taskName.toLowerCase().indexOf(taskName.toLowerCase()) === -1) {
                    taskflag = false;
                }
                if (item.parentTask === undefined) {
                    parentFlag = true;
                } else if (parentTask && item.parentTask.toLowerCase().indexOf(parentTask.toLowerCase()) === -1) {
                    parentFlag = false;
                }
                if (priorityFrom && item.priority < priorityFrom) {
                    priorityFromFlag = false;
                }
                if (priorityTo && item.priority > priorityTo) {
                    priorityToFlag = false;
                }
                if (startDate) {
                    const d1 = new Date(item.startDate);
                    const d2 = new Date(startDate);
                    return d1.getTime() === d2.getTime();

                }
                if (endDate) {
                    const d1 = new Date(item.endDate);
                    const d2 = new Date(endDate);
                    return d1.getTime() === d2.getTime();

                }
                if (!(taskflag && parentFlag && priorityFromFlag && priorityToFlag )) {
                    return false;
                }

                return true;
           });
        } else {
            return _taskList;
        }

        // const filterItems = (arr, task, parent?) => {
        //     return arr.filter(item => {
        //        return ((item.taskName.toLowerCase().indexOf(task.toLowerCase()) > -1)
        //        || (item.parentTask !==undefined && item.parentTask.toLowerCase().indexOf(parent) > -1 )
        //        );

        //     }
        //     );
        //                    };
        //  if (taskName || parentTask) {
        //     return  filterItems(_taskList, taskName, parentTask);
        //  } else {
        //      return _taskList;
        //  }

    }
}
