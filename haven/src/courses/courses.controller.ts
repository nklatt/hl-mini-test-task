import { Body, Controller, Param, ParseIntPipe } from "@nestjs/common";
import { role } from "@prisma/client";

import { RequiresPrivilege } from "src/authentication/access-control";
import type { API } from "src/hl-common/api/API";
import { ApiRes, ApiResArray } from "src/hl-common/api/Response";
import {
  CourseEntity,
  CourseSummaryEntity,
} from "src/hl-common/entities/Courses";
import { Route } from "src/utils/route.decorator";
import { CoursesService } from "./courses.service";

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Route(RequiresPrivilege(role.registered))
  async getCourses(): API.getCourses.resp {
    const courses = await this.coursesService.findAll();
    return new ApiResArray(
      courses.map((c) => CourseSummaryEntity.fromPrisma(c)),
    );
  }

  @Route(RequiresPrivilege(role.registered))
  async getCourse(
    @Param("courseId", ParseIntPipe) courseId: number,
  ): API.getCourse.resp {
    const course = await this.coursesService.findById(courseId);
    return new ApiRes(CourseEntity.fromPrismaWithModules(course));
  }

  @Route(RequiresPrivilege(role.admin))
  async createCourse(
    @Body() { title, description }: API.createCourse.body,
  ): API.createCourse.resp {
    const course = await this.coursesService.create(title, description);
    return new ApiRes(CourseSummaryEntity.fromPrisma(course));
  }

  @Route(RequiresPrivilege(role.admin))
  async updateCourse(
    @Param("courseId", ParseIntPipe) courseId: number,
    @Body() { title, description }: API.updateCourse.body,
  ): API.updateCourse.resp {
    const course = await this.coursesService.update(
      courseId,
      title,
      description,
    );
    return new ApiRes(CourseSummaryEntity.fromPrisma(course));
  }
}
