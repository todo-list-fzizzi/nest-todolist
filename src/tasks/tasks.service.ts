import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  getAllTasks() {
    return this.taskRepository.find();
  }

  createTask(taskData: CreateTaskDto) {
    const newTask = Object.assign({ status: TaskStatus.PENDING }, taskData);
    const task = this.taskRepository.create(newTask);
    return this.taskRepository.save(task);
  }

  async updateTask(id: string, updatedFields: UpdateTaskDto) {
    const updateResult = await this.taskRepository.update(
      { id },
      updatedFields,
    );
    const task = await this.getTaskById(id);
    return { task, updateResult };
  }

  deleteTask(id: string) {
    const deleteResult = this.taskRepository.delete({ id });
    return { id, deleteResult };
  }

  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }
}
