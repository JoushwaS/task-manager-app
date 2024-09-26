import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: {
    title: string;
    description: string;
  }): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        // Add other required fields if needed, such as status or createdAt
      },
    });
  }

  async getAllTasks(status?: string, order?: 'asc' | 'desc'): Promise<Task[]> {
    const query: any = {
      where: {},
      orderBy: {},
    };

    // Filter by status if provided
    if (status) {
      query.where.status = status; // Assuming 'status' is a field in your Task model
    }

    // Set orderBy based on the provided order
    if (order) {
      query.orderBy.createdAt = order; // Assuming you want to order by 'createdAt'
    }

    return this.prisma.task.findMany(query);
  }

  async getTaskById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.prisma.task.findUnique({ where: { id } });
    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        ...data,
        status: data.status,
      },
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
