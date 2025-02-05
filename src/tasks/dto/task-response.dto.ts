import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

export class TaskResponseDto {

        @ApiProperty()
        @AutoMap()
        id: string

        @ApiProperty()
        @AutoMap()
        title: string;
      
        @ApiProperty()
        @AutoMap()
        description: string;
      
        @ApiProperty({ enum: TaskStatus })
        @AutoMap()
        status: TaskStatus;
      
        @ApiProperty({ enum: TaskPriority })
        @AutoMap()
        priority: TaskPriority;
      
        @ApiProperty()
        @AutoMap()
        due_date: Date;
      
        @ApiProperty()
        @AutoMap()
        project_id: string;
      
        @ApiProperty()
        @AutoMap()
        created_by: string;
}
