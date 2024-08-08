import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './task.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(newTask);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    return this.tasksService.deleteTask(id);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updatedFields: UpdateTaskDto,
  ): Promise<UpdateResult> {
    return this.tasksService.updateTask(id, updatedFields);
  }
}
