export class TasksService {
  static sendEmailOnComplete (taskId: string) {
    console.log(`Send completed email for task ${taskId}`);
  }
  static sendEmailOnOverdue (taskId: string) {
    console.log(`Send overdue email for task ${taskId}`);
  }
}