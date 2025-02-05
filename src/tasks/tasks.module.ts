import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { TaskProfile } from './mapper/task.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AutomapperModule.forRoot({strategyInitializer: classes()})],
  controllers: [TasksController],
  providers: [TasksService, TaskProfile],
})
export class TasksModule {}
