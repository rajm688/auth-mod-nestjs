import { EntityRepository, Repository } from 'typeorm';
import { TaskDto } from './DTO/task.dto';
import { Tasks, TaskStatus } from './tasks.entity';
@EntityRepository(Tasks)
export class TaskRepository extends Repository<Tasks> {
  async getTasks(): Promise<TaskDto[]> {
    const allTasks = await this.createQueryBuilder().getMany();
    return allTasks;
  }
  async getTaskById(id: string) {
    try {
      const task = await this.createQueryBuilder().where({ id }).getOne();
      if (task) {
        return task;
      } else return { mes: 'task not found' };
    } catch (error) {
      throw new Error('error in getting task by id');
    }
  }
  async createTask(res: TaskDto) {
    const { title, desc, status } = res;
    await this.createQueryBuilder()
      .insert()
      .into(Tasks)
      .values({ title, desc, status: TaskStatus.open })
      .execute();
    return { mes: 'task created successfully' };
  }
  async deleteTask(id: string) {
    const result = await this.createQueryBuilder()
      .delete()
      .from(Tasks)
      .where({ id })
      .execute();
    if (result.affected === 0) {
      return { mes: 'task does not exists' };
    } else return { mes: 'Task deleted successfully' };
  }
  async updateTask(id: string, status: TaskStatus) {
    try {
      const updatedTask = this.createQueryBuilder()
        .update(Tasks)
        .set({ status })
        .where({ id })
        .execute();
      if ((await updatedTask).affected === 0) {
        return { mes: 'Task does not exists' };
      } else {
        return { mes: ' task updated successfully' };
      }
    } catch (error) {
      return { mes: 'error in updating task' };
    }
  }
}
