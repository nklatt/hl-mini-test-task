import type { cards } from "@prisma/client";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { IsId } from "../decorators/is-id.decorator";
import { Trim } from "../decorators/Trim.decorator";
import { card_interaction_type } from "../PrismaEnums";

export class CardEntity {
  constructor(input: CardEntity) {
    Object.assign(this, input);
  }

  static fromPrisma(c: cards): CardEntity {
    return new CardEntity({
      id: c.id,
      title: c.title,
      body: c.body,
      interaction_type: c.interaction_type as card_interaction_type,
      options: c.options as RadioOption[] | null,
      order: c.order,
      module_id: c.module_id,
    });
  }

  @IsId()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  body: string;

  @IsEnum(card_interaction_type)
  interaction_type: card_interaction_type;

  @IsOptional()
  @IsArray()
  options: RadioOption[] | null;

  @IsNumber()
  order: number;

  @IsId()
  module_id: number;
}

export type RadioOption = {
  label: string;
  correct: boolean;
};

export class CreateCardBody {
  @Trim()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Trim()
  @IsString()
  body: string;

  @IsEnum(card_interaction_type)
  interaction_type: card_interaction_type;

  @IsOptional()
  @IsArray()
  options?: RadioOption[];

  @IsNumber()
  order: number;
}

export class UpdateCardBody {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @Trim()
  @IsString()
  @IsOptional()
  body?: string;

  @IsEnum(card_interaction_type)
  @IsOptional()
  interaction_type?: card_interaction_type;

  @IsOptional()
  @IsArray()
  options?: RadioOption[];

  @IsNumber()
  @IsOptional()
  order?: number;
}
