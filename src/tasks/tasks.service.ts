import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  
  async create(createTaskDto: CreateTaskDto, userId: string) {
    this.logger.log(`Creating task for user ${userId}`);
    let task = this.tasksRepository.create({
      ...createTaskDto,
      project: { id: createTaskDto.project_id } as any,
    });
    task.created_by = userId;
    const savedTask = await this.tasksRepository.save(task);
    this.logger.log(`Task ${savedTask.id} created successfully`);
    return savedTask;
  }
  

  findAll(userId: string) {
    this.logger.log(`Fetching all tasks for user ${userId}`);
    return this.tasksRepository.find({
      where: {created_by: userId},
      relations: ['project'],
    });
  }

  findAllByProjectId(projectId: string, userId: string) {
    this.logger.log(`Fetching all tasks for project ${projectId} and user ${userId}`);
    return this.tasksRepository.find({
      where: {
        project: {id: projectId},
        created_by: userId
      },
      relations: ['project'],
    });
  }


  async findOne(id: string, userId: string) {
    this.logger.log(`Fetching task ${id} for user ${userId}`);
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['project'],
    });
    
    if (!task) {
      this.logger.warn(`Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    if (task.created_by != userId) {
      this.logger.warn(`Unauthorized access attempt to task ${id} by user ${userId}`);
      throw new UnauthorizedException(`Unauthorized`);
    }
    
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    this.logger.log(`Updating task ${id} for user ${userId}`);
    const task = await this.findOne(id, userId);
    Object.assign(task, updateTaskDto);
    const updatedTask = await this.tasksRepository.save(task);
    this.logger.log(`Task ${id} updated successfully`);
    return updatedTask;
  }

  async remove(id: string, userId: string) {
    this.logger.log(`Removing task ${id} for user ${userId}`);
    const task = await this.findOne(id, userId);
    const removedTaks = await this.tasksRepository.remove(task);
    this.logger.log(`Task ${id} removed successfully`);
    return removedTaks;
  }
}
