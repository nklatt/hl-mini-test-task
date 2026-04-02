import type { modules } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { IsId } from "../decorators/is-id.decorator";
import { CardEntity } from "./Cards";

export class ModuleEntity {
  constructor(input: ModuleEntity) {
    Object.assign(this, input);
  }

  static fromPrisma(m: modules & { cards?: any[] }): ModuleEntity {
    return new ModuleEntity({
      id: m.id,
      title: m.title,
      order: m.order,
      course_id: m.course_id,
      cards: m.cards ? m.cards.map((c) => CardEntity.fromPrisma(c)) : undefined,
    });
  }

  @IsId()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  order: number;

  @IsId()
  course_id: number;

  @IsOptional()
  cards?: CardEntity[];
}
