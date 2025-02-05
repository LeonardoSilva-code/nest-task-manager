import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Project } from "../entities/project.entity";
import { ProjectResponseDto } from "../dto/project-response.dto";

@Injectable()
export class ProjectProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Project, ProjectResponseDto);
    };
  }
}