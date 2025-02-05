import { 
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Logger 
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskResponseDto } from './dto/task-response.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Task } from './entities/task.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('api/v1/task')
@Controller('api/v1/task')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(
    private readonly tasksService: TasksService, 
    @InjectMapper() private readonly classMapper: Mapper
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiOkResponse({ description: 'The task', type: TaskResponseDto, isArray: false })
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
    const userId = request['user']?.sub;
    this.logger.log(`User ${userId} is creating a new task: ${JSON.stringify(createTaskDto)}`);

    const task = await this.tasksService.create(createTaskDto, userId);
    this.logger.log(`Task created successfully: ${task.id}`);

    return this.classMapper.mapAsync(task, Task, TaskResponseDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiOkResponse({ description: 'The task', type: TaskResponseDto, isArray: true })
  async findAll(@Req() request: Request) {
    const userId = request['user']?.sub;
    this.logger.log(`Fetching all tasks for user ${userId}`);

    const tasks = await this.tasksService.findAll(userId);
    this.logger.log(`Found ${tasks.length} tasks for user ${userId}`);

    return this.classMapper.mapArrayAsync(tasks, Task, TaskResponseDto);
  }

  @Get('/project/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get tasks by project ID' })
  @ApiOkResponse({ description: 'The task', type: TaskResponseDto, isArray: true })
  async findAllByProjectId(@Param('id') projectId: string, @Req() request: Request) {
    const userId = request['user']?.sub;
    this.logger.log(`Fetching tasks for project ${projectId} and user ${userId}`);

    const tasks = await this.tasksService.findAllByProjectId(projectId, userId);
    this.logger.log(`Found ${tasks.length} tasks for project ${projectId}`);

    return this.classMapper.mapArrayAsync(tasks, Task, TaskResponseDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiOkResponse({ description: 'The task', type: TaskResponseDto, isArray: false })
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const userId = request['user']?.sub;
    this.logger.log(`Fetching task ${id} for user ${userId}`);

    const task = await this.tasksService.findOne(id, userId);
    if (task) {
      this.logger.log(`Task found: ${task.id}`);
    } else {
      this.logger.warn(`Task ${id} not found for user ${userId}`);
    }

    return this.classMapper.mapAsync(task, Task, TaskResponseDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a task' })
  @ApiOkResponse({ description: 'The task', type: TaskResponseDto, isArray: false })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() request: Request) {
    const userId = request['user']?.sub;
    this.logger.log(`User ${userId} is updating task ${id} with data: ${JSON.stringify(updateTaskDto)}`);

    const updatedTask = await this.tasksService.update(id, updateTaskDto, userId);
    this.logger.log(`Task ${id} updated successfully`);

    return this.classMapper.mapAsync(updatedTask, Task, TaskResponseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiOkResponse({ description: 'The task', type: TaskResponseDto, isArray: false })
  async remove(@Param('id') id: string, @Req() request: Request) {
    const userId = request['user']?.sub;
    this.logger.log(`User ${userId} is deleting task ${id}`);

    await this.tasksService.remove(id, userId);
    this.logger.log(`Task ${id} deleted successfully`);

    return { message: `Task ${id} deleted successfully` };
  }
}