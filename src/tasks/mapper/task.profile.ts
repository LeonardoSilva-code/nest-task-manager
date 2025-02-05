import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Task } from "../entities/task.entity";
import { TaskResponseDto } from "../dto/task-response.dto";

@Injectable()
export class TaskProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Task, TaskResponseDto, forMember(
        (dest) => dest.project_id, 
        mapFrom((src) => src.project?.id) 
      )
    );
   };
 }
}