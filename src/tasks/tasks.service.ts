import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDto } from './DTO/task.dto';
import { TaskStatus } from './tasks.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  getTasks() {
    return this.taskRepository.getTasks();
  }
  getTaskById(id: string) {
    return this.taskRepository.getTaskById(id);
  }
  createTask(res: TaskDto) {
    return this.taskRepository.createTask(res);
  }
  deleteTask(id: string) {
    return this.taskRepository.deleteTask(id);
  }
  updateTask(id: string, status: TaskStatus) {
    return this.taskRepository.updateTask(id, status);
  }
}
