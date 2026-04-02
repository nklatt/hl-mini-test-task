import { Body, Controller, Param, ParseIntPipe } from "@nestjs/common";
import { role } from "@prisma/client";

import { RequiresPrivilege } from "src/authentication/access-control";
import type { API } from "src/hl-common/api/API";
import { ApiRes, ApiResArray, ApiResSuccess } from "src/hl-common/api/Response";
import { ModuleEntity } from "src/hl-common/entities/Modules";
import { Route } from "src/utils/route.decorator";
import { ModulesService } from "./modules.service";

@Controller()
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Route(RequiresPrivilege(role.registered))
  async getModules(
    @Param("courseId", ParseIntPipe) courseId: number,
  ): API.getModules.resp {
    const modules = await this.modulesService.findByCourse(courseId);
    return new ApiResArray(modules.map((m) => ModuleEntity.fromPrisma(m)));
  }

  @Route(RequiresPrivilege(role.registered))
  async getModule(
    @Param("courseId", ParseIntPipe) courseId: number,
    @Param("moduleId", ParseIntPipe) moduleId: number,
  ): API.getModule.resp {
    const module = await this.modulesService.findById(courseId, moduleId);
    return new ApiRes(ModuleEntity.fromPrisma(module));
  }

  @Route(RequiresPrivilege(role.admin))
  async createModule(
    @Param("courseId", ParseIntPipe) courseId: number,
    @Body() { title, order }: API.createModule.body,
  ): API.createModule.resp {
    const module = await this.modulesService.create(courseId, title, order);
    return new ApiRes(ModuleEntity.fromPrisma(module));
  }

  @Route(RequiresPrivilege(role.admin))
  async updateModule(
    @Param("courseId", ParseIntPipe) courseId: number,
    @Param("moduleId", ParseIntPipe) moduleId: number,
    @Body() { title, order }: API.updateModule.body,
  ): API.updateModule.resp {
    const module = await this.modulesService.update(
      courseId,
      moduleId,
      title,
      order,
    );
    return new ApiRes(ModuleEntity.fromPrisma(module));
  }

  @Route(RequiresPrivilege(role.admin))
  async deleteModule(
    @Param("courseId", ParseIntPipe) courseId: number,
    @Param("moduleId", ParseIntPipe) moduleId: number,
  ): API.deleteModule.resp {
    await this.modulesService.delete(courseId, moduleId);
    return new ApiResSuccess(true);
  }
}
