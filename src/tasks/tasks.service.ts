import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from "./dto/task.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  getAllTasks() {
    return this.taskRepository.find();
  }

  createTask(taskData: CreateTaskDto) {
    const newTask = Object.assign({ status: TaskStatus.OPEN }, taskData);
    const task = this.taskRepository.create(newTask);
    return this.taskRepository.save(task);
  }

  updateTask(id: string, updatedFields: UpdateTaskDto) {
    return this.taskRepository.update({ id }, updatedFields);
  }

  deleteTask(id: string) {
    return this.taskRepository.delete({ id });
  }

  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }
}
