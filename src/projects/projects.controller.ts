import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Logger } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Project } from './entities/project.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ProjectResponseDto } from './dto/project-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('api/v1/projects')
@Controller('api/v1/projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);
  
  constructor(private readonly projectsService: ProjectsService, @InjectMapper() private readonly classMapper: Mapper) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new project' })
  @ApiOkResponse({
    description: 'The project',
    type: ProjectResponseDto,
    isArray: false
  })
  async create(@Body() createProjectDto: CreateProjectDto, @Req() request: Request) {
   const userId = request['user']?.sub;
   this.logger.log(`Creating project for userId: ${userId}`);
   
   const project = await this.projectsService.create(createProjectDto, userId);
   this.logger.log(`Project created: ${project.id}`);

   return this.classMapper.mapAsync(project, Project, ProjectResponseDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all projects' })
  @ApiOkResponse({
    description: 'The projects',
    type: ProjectResponseDto,
    isArray: true
  })
  async findAll(@Req() request: Request) {
    const userId = request['user']?.sub;
    this.logger.log(`Fetching all projects for userId: ${userId}`);

    const projects = await this.projectsService.findAll(userId);
    this.logger.log(`Found ${projects.length} projects`);

    return this.classMapper.mapArrayAsync(projects, Project, ProjectResponseDto)
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a project by id' })
  @ApiOkResponse({
    description: 'The project',
    type: ProjectResponseDto,
    isArray: false
  })
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const userId = request['user']?.sub;
    this.logger.log(`Fetching project with id: ${id} for userId: ${userId}`);

    const project = await this.projectsService.findOne(id, userId);
    this.logger.log(`Project fetched: ${project ? 'Exists' : 'Not Found'}`);

    return this.classMapper.mapAsync(project, Project, ProjectResponseDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a project' })
  @ApiOkResponse({
    description: 'The project',
    type: ProjectResponseDto,
    isArray: false
  })
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @Req() request: Request) {
    const userId = request['user']?.sub;
    this.logger.log(`Updating project with id: ${id} for userId: ${userId}`);

    const updatedProject = await this.projectsService.update(id, updateProjectDto, userId);
    this.logger.log(`Project updated: ${updatedProject.id}`);

    return this.classMapper.mapAsync(updatedProject, Project, ProjectResponseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a project' })
  @ApiOkResponse({
    description: 'The project',
    type: ProjectResponseDto,
    isArray: false
  })
  async remove(@Param('id') id: string, @Req() request: Request) {
    const userId = request['user']?.sub;
    this.logger.warn(`Deleting project with id: ${id} for userId: ${userId}`);

    const project = await this.projectsService.remove(id, userId)
    this.logger.log(`Project deleted: ${id}`);
    
    return this.classMapper.mapAsync(project, Project, ProjectResponseDto);
  }
}
