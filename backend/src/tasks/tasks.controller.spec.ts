import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotFoundException } from '@nestjs/common';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  const mockTasksService = {
    createTask: jest.fn(),
    getAllTasks: jest.fn(),
    getTaskById: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTasksService }],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Task description',
      };
      const result: Task = {
        id: 1,
        ...createTaskDto,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTasksService.createTask.mockReturnValue(result);

      expect(await tasksController.create(createTaskDto)).toBe(result);
      expect(mockTasksService.createTask).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          id: 1,
          title: 'Test Task',
          description: 'Task description',
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      mockTasksService.getAllTasks.mockReturnValue(result);

      expect(await tasksController.findAll({})).toBe(result);
      expect(mockTasksService.getAllTasks).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const result: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Task description',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTasksService.getTaskById.mockReturnValue(result);

      expect(await tasksController.findOne('1')).toBe(result);
      expect(mockTasksService.getTaskById).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated description',
        status: 'completed',
      };
      const result: any = {
        id: 1,
        ...updateTaskDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTasksService.updateTask.mockReturnValue(result);

      expect(await tasksController.update('1', updateTaskDto)).toBe(result);
      expect(mockTasksService.updateTask).toHaveBeenCalledWith(
        1,
        updateTaskDto,
      );
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      const result: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Task description',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTasksService.deleteTask.mockReturnValue(result);

      expect(await tasksController.delete('1')).toBe(result);
      expect(mockTasksService.deleteTask).toHaveBeenCalledWith(1);
    });
  });
});
