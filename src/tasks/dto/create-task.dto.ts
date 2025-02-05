import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../entities/task.entity';


export class CreateTaskDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @ApiProperty({ enum: TaskStatus })
    @IsEnum(TaskStatus)
    status: TaskStatus;
  
    @ApiProperty({ enum: TaskPriority })
    @IsEnum(TaskPriority)
    priority: TaskPriority;
  
    @ApiProperty()
    @IsDateString()
    due_date: Date;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    project_id: string;
}
