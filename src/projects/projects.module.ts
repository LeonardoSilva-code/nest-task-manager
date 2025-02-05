import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ProjectProfile } from './mapper/project.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), AutomapperModule.forRoot({strategyInitializer: classes()})],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectProfile],
})
export class ProjectsModule {}
