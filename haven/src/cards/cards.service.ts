import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import type { RadioOption } from "src/hl-common/entities/Cards";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByModule(courseId: number, moduleId: number) {
    return this.prismaService.cards.findMany({
      where: { module_id: moduleId, module: { course_id: courseId } },
      orderBy: { order: "asc" },
    });
  }

  async findById(courseId: number, moduleId: number, cardId: number) {
    return this.prismaService.cards.findUniqueOrThrow({
      where: {
        id: cardId,
        module_id: moduleId,
        module: { course_id: courseId },
      },
    });
  }

  async create(
    _courseId: number,
    moduleId: number,
    data: {
      title: string;
      body: string;
      interaction_type: string;
      options?: RadioOption[];
    },
  ) {
    const last = await this.prismaService.cards.findFirst({
      where: { module_id: moduleId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const order = (last?.order ?? 0) + 1;
    return this.prismaService.cards.create({
      data: {
        title: data.title,
        body: data.body,
        interaction_type: data.interaction_type as any,
        options: data.options
          ? (data.options as unknown as Prisma.JsonArray)
          : Prisma.JsonNull,
        order,
        module_id: moduleId,
      },
    });
  }

  async update(
    courseId: number,
    moduleId: number,
    cardId: number,
    incoming: {
      title?: string;
      body?: string;
      interaction_type?: string;
      options?: RadioOption[];
      order?: number;
    },
  ) {
    const current = await this.prismaService.cards.findUniqueOrThrow({
      where: { id: cardId, module_id: moduleId, module: { course_id: courseId } },
    });
    const data: Prisma.cardsUpdateInput = {};
    if (incoming.title !== undefined && incoming.title !== current.title)
      data.title = incoming.title;
    if (incoming.body !== undefined && incoming.body !== current.body)
      data.body = incoming.body;
    if (
      incoming.interaction_type !== undefined &&
      incoming.interaction_type !== current.interaction_type
    )
      data.interaction_type = incoming.interaction_type as any;
    if (incoming.options !== undefined) {
      const incomingJson = JSON.stringify(incoming.options);
      const currentJson = JSON.stringify(current.options);
      if (incomingJson !== currentJson)
        data.options = incoming.options as unknown as Prisma.JsonArray;
    }
    if (incoming.order !== undefined && incoming.order !== current.order)
      data.order = incoming.order;
    if (Object.keys(data).length === 0) return current;
    return this.prismaService.cards.update({
      where: { id: cardId, module_id: moduleId, module: { course_id: courseId } },
      data,
    });
  }

  async delete(courseId: number, moduleId: number, cardId: number) {
    return this.prismaService.cards.delete({
      where: {
        id: cardId,
        module_id: moduleId,
        module: { course_id: courseId },
      },
    });
  }

  validateAnswer(options: RadioOption[], selectedIndex: number): boolean {
    if (!options || selectedIndex < 0 || selectedIndex >= options.length) {
      return false;
    }
    return options[selectedIndex]?.correct ?? false;
  }
}
