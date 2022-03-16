import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskDto } from './DTO/task.dto';
import { TaskStatus } from '../entities/tasks.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './DTO/create-task-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getTasks();
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }
  @Post()
  addTask(@Body() res: CreateTaskDto) {
    return this.taskService.createTask(res);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
  @Patch('/:id/task')
  updateTask(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.taskService.updateTask(id, status);
  }
  @Get('/test')
  @UseGuards(AuthGuard())
  test() {
    return 'hello test';
  }
}
