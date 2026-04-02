import { Body, Controller, Param, ParseIntPipe } from "@nestjs/common";
import { role } from "@prisma/client";

import { RequiresPrivilege } from "src/authentication/access-control";
import type { API } from "src/hl-common/api/API";
import { ApiRes, ApiResArray, ApiResSuccess } from "src/hl-common/api/Response";
import { CardEntity } from "src/hl-common/entities/Cards";
import { Route } from "src/utils/route.decorator";
import { CardsService } from "./cards.service";

@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Route(RequiresPrivilege(role.registered))
  async getCards(
    @Param("courseId", ParseIntPipe) courseId: number,
    @Param("moduleId", ParseIntPipe) moduleId: number,
  ): API.getCards.resp {
    const cards = await this.cardsService.findByModule(courseId, moduleId);
    return new ApiResArray(cards.map((c) => CardEntity.fromPrisma(c)));
  }

  @Route(RequiresPrivilege(role.registered))
  async getCard(
    @Param("courseId", ParseIntPipe) courseId: number,
    @Param("moduleId", ParseIntPipe) moduleId: number,
    @Param("cardId", ParseIntPipe) cardId: number,
  ): API.getCard.resp {
    const card = await this.cardsService.findById(courseId, moduleId, cardId);
    return new ApiRes(CardEntity.fromPrisma(card));
  }

  @Route(RequiresPrivilege(role.admin))
  async createCard(
    @Param("courseId", ParseIntPipe) courseId: number,
    @Param("moduleId", ParseIntPipe) moduleId: number,
    @Body() body: API.createCard.body,
  ): API.createCard.resp {
    const card = await this.cardsService.create(courseId, moduleId, body);
    return new ApiRes(CardEntity.fromPrisma(card));
  }

  @Route(RequiresPrivilege(role.admin))
  async updateCard(
    @Param("courseId", ParseIntPipe) courseId: number,
    @Param("moduleId", ParseIntPipe) moduleId: number,
    @Param("cardId", ParseIntPipe) cardId: number,
    @Body() body: API.updateCard.body,
  ): API.updateCard.resp {
    const card = await this.cardsService.update(
      courseId,
      moduleId,
      cardId,
      body,
    );
    return new ApiRes(CardEntity.fromPrisma(card));
  }

  @Route(RequiresPrivilege(role.admin))
  async deleteCard(
    @Param("courseId", ParseIntPipe) courseId: number,
    @Param("moduleId", ParseIntPipe) moduleId: number,
    @Param("cardId", ParseIntPipe) cardId: number,
  ): API.deleteCard.resp {
    await this.cardsService.delete(courseId, moduleId, cardId);
    return new ApiResSuccess(true);
  }
}
