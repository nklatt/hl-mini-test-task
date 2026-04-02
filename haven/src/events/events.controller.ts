import { Body, Controller, Param, ParseIntPipe } from "@nestjs/common";
import { role } from "@prisma/client";

import { RequiresPrivilege } from "src/authentication/access-control";
import { UserId } from "src/authentication/user-id.decorator";
import type { API } from "src/hl-common/api/API";
import { ApiRes } from "src/hl-common/api/Response";
import { CardSubmitEventEntity } from "src/hl-common/entities/Events";
import { Route } from "src/utils/route.decorator";
import { EventsService } from "./events.service";

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Route(RequiresPrivilege(role.registered))
  async ingestEvent(
    @UserId() userId: number,
    @Body() body: API.ingestEvent.body,
  ): API.ingestEvent.resp {
    const results = await this.eventsService.ingestEvent(userId, body);
    const cardSubmitEvent = results[0];
    return new ApiRes(CardSubmitEventEntity.fromPrisma(cardSubmitEvent));
  }

  @Route(RequiresPrivilege(role.registered))
  async getModuleEvents(
    @UserId() userId: number,
    @Param("courseId", ParseIntPipe) courseId: number,
  ): API.getModuleEvents.resp {
    const events = await this.eventsService.getUserEventsByCourse(
      userId,
      courseId,
    );

    return new ApiRes({
      moduleBeginIds: events.moduleBeginEvents.map((e) => e.module_id),
      moduleCompleteIds: events.moduleCompleteEvents.map((e) => e.module_id),
    });
  }
}
