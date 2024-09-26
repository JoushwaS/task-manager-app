import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

describe('TasksController', () => {
  let app: INestApplication;
  let tasksService: TasksService;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending',
    createdAt: new Date(),
  };

  const tasksServiceMock = {
    createTask: jest.fn().mockResolvedValue(mockTask),
    getAllTasks: jest.fn().mockResolvedValue([mockTask]),
    getTaskById: jest.fn().mockResolvedValue(mockTask),
    updateTask: jest
      .fn()
      .mockResolvedValue({ ...mockTask, status: 'completed' }),
    deleteTask: jest.fn().mockResolvedValue(mockTask),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: TasksService, useValue: tasksServiceMock },
        PrismaService, // This can be a real or mocked service based on your needs
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    tasksService = moduleRef.get<TasksService>(TasksService);
  });

  it('should create a task', async () => {
    const createTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    };

    return request(app.getHttpServer())
      .post('/tasks')
      .send(createTaskDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject(createTaskDto);
        expect(tasksService.createTask).toHaveBeenCalledWith(createTaskDto);
      });
  });

  it('should retrieve all tasks', async () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject(mockTask);
        expect(tasksService.getAllTasks).toHaveBeenCalled();
      });
  });

  it('should retrieve a task by ID', async () => {
    return request(app.getHttpServer())
      .get(`/tasks/${mockTask.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject(mockTask);
        expect(tasksService.getTaskById).toHaveBeenCalledWith(mockTask.id);
      });
  });

  it('should update a task', async () => {
    const updateTaskDto = { status: 'completed' };

    return request(app.getHttpServer())
      .patch(`/tasks/${mockTask.id}`)
      .send(updateTaskDto)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('completed');
        expect(tasksService.updateTask).toHaveBeenCalledWith(
          mockTask.id,
          updateTaskDto,
        );
      });
  });

  it('should delete a task', async () => {
    return request(app.getHttpServer())
      .delete(`/tasks/${mockTask.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject(mockTask);
        expect(tasksService.deleteTask).toHaveBeenCalledWith(mockTask.id);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
