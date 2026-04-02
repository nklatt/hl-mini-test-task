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
      order: number;
    },
  ) {
    return this.prismaService.cards.create({
      data: {
        title: data.title,
        body: data.body,
        interaction_type: data.interaction_type as any,
        options: data.options
          ? (data.options as unknown as Prisma.JsonArray)
          : Prisma.JsonNull,
        order: data.order,
        module_id: moduleId,
      },
    });
  }

  async update(
    courseId: number,
    moduleId: number,
    cardId: number,
    data: {
      title?: string;
      body?: string;
      interaction_type?: string;
      options?: RadioOption[];
      order?: number;
    },
  ) {
    return this.prismaService.cards.update({
      where: {
        id: cardId,
        module_id: moduleId,
        module: { course_id: courseId },
      },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.body !== undefined ? { body: data.body } : {}),
        ...(data.interaction_type !== undefined
          ? { interaction_type: data.interaction_type as any }
          : {}),
        ...(data.options !== undefined
          ? { options: data.options as unknown as Prisma.JsonArray }
          : {}),
        ...(data.order !== undefined ? { order: data.order } : {}),
      },
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
