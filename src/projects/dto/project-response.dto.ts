import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/entities/task.entity';

export class ProjectResponseDto {
    @ApiProperty()
    @AutoMap()
    id: string;

    @ApiProperty()
    @AutoMap()
    name: string;

    @ApiProperty()
    @AutoMap()
    description: string;

    @ApiProperty()
    @AutoMap()
    owner_id: string;

    @ApiProperty()
    @AutoMap()
    created_at: Date;

    @ApiProperty()
    @AutoMap()
    updated_at: Date;
}
