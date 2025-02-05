import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    this.logger.log(`Creating project for user ${userId}`);
    let project = this.projectsRepository.create(createProjectDto);
    project.owner_id = userId;
    const savedProject = await this.projectsRepository.save(project);
    this.logger.log(`Project ${savedProject.id} created successfully`);
    return savedProject;
  }

  findAll(userId: string) {
    this.logger.log(`Fetching all projects for user ${userId}`);
    return this.projectsRepository.find({
      where: { owner_id: userId },
      relations: ['tasks'],
    });
  }

  async findOne(id: string, userId: string) {
    this.logger.log(`Fetching project ${id} for user ${userId}`);
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    
    if (!project) {
      this.logger.warn(`Project with ID ${id} not found`);
      throw new NotFoundException(`Project with ID ${id} not found`);
    }else if (project.owner_id != userId) {
      this.logger.warn(`Unauthorized access attempt to project ${id} by user ${userId}`);
      throw new UnauthorizedException(`Unauthorized`);
    }
    
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
      this.logger.log(`Updating project ${id} for user ${userId}`);
      const project = await this.findOne(id, userId);
      Object.assign(project, updateProjectDto);
      const updatedProject = await this.projectsRepository.save(project);
      this.logger.log(`Project ${id} updated successfully`);
      return updatedProject;
  }

  async remove(id: string, userId: string) {
    this.logger.log(`Removing project ${id} for user ${userId}`);
    const project = await this.findOne(id, userId);
    const removedProject = await this.projectsRepository.remove(project);
    this.logger.log(`Project ${id} removed successfully`);
    return removedProject;
  }
}
