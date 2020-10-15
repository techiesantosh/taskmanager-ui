export class TaskResponse {

    public taskId: number;
    public taskName: string;
    public priority: number;
    public parentTask = '';
    public parentTaskId: number;
    public startDate: string;
    public endDate: string;

}
