import type { courses } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

import { IsId } from "../decorators/is-id.decorator";
import { ModuleEntity } from "./Modules";

export class CourseSummaryEntity {
  constructor(input: CourseSummaryEntity) {
    Object.assign(this, input);
  }

  static fromPrisma(c: courses): CourseSummaryEntity {
    return new CourseSummaryEntity({
      id: c.id,
      title: c.title,
      description: c.description ?? undefined,
    });
  }

  @IsId()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CourseEntity extends CourseSummaryEntity {
  constructor(input: CourseEntity) {
    const { id, title, description, ...rest } = input;
    super({ id, title, description });
    Object.assign(this, rest);
  }

  static fromPrismaWithModules(c: courses & { modules?: any[] }): CourseEntity {
    return new CourseEntity({
      id: c.id,
      title: c.title,
      description: c.description ?? undefined,
      modules: c.modules
        ? c.modules.map((m) => ModuleEntity.fromPrisma(m))
        : [],
    });
  }

  modules: ModuleEntity[];
}
