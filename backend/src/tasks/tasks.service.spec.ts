import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TasksService', () => {
  let tasksService: TasksService;
  let prisma: PrismaService;

  const mockPrismaService = {
    task: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const result = [{ id: 1, title: 'Test Task', status: 'pending' }];
      mockPrismaService.task.findMany.mockReturnValue(result);

      expect(await tasksService.getAllTasks()).toBe(result);
      expect(mockPrismaService.task.findMany).toHaveBeenCalled();
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask = { title: 'New Task', description: 'Task description' };
      const result = { id: 1, ...newTask };
      mockPrismaService.task.create.mockReturnValue(result);

      expect(await tasksService.createTask(newTask)).toBe(result);
      expect(mockPrismaService.task.create).toHaveBeenCalledWith({
        data: newTask,
      });
    });
  });
});
