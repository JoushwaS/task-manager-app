import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() body: CreateTaskDto): Promise<Task> {
    console.log('body>>', body);

    return this.tasksService.createTask(body);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto, // Use the DTO for validation and type safety
  ): Promise<Task> {
    // Ensure the ID is a number before passing it to the service
    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      throw new NotFoundException(`Invalid task ID: ${id}`);
    }

    // Call the service to update the task
    return this.tasksService.updateTask(taskId, updateTaskDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(+id);
  }
}
