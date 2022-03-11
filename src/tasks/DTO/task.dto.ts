import { TaskStatus } from '../../entities/tasks.entity';

export class TaskDto {
  title: string;
  desc: string;
  status: TaskStatus;
}
