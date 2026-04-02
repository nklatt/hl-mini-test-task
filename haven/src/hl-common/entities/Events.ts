import type { card_submit_events } from "@prisma/client";
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from "class-validator";

import { IsId } from "../decorators/is-id.decorator";

export class CardSubmitEventEntity {
  constructor(input: CardSubmitEventEntity) {
    Object.assign(this, input);
  }

  static fromPrisma(e: card_submit_events): CardSubmitEventEntity {
    return new CardSubmitEventEntity({
      id: e.id,
      uuid: e.uuid,
      cardId: e.card_id,
      moduleId: e.module_id,
      courseId: e.course_id,
      userId: e.user_id,
      correct: e.correct,
      skip: e.skip,
      retryable: e.retryable,
      duration: e.duration,
      timestamp: e.timestamp.toISOString(),
    });
  }

  @IsId()
  id: number;

  @IsUUID()
  uuid: string;

  @IsId()
  cardId: number;

  @IsId()
  moduleId: number;

  @IsId()
  courseId: number;

  @IsId()
  userId: number;

  @IsBoolean()
  correct: boolean;

  @IsBoolean()
  skip: boolean;

  @IsBoolean()
  retryable: boolean;

  @IsNumber()
  duration: number;

  @IsDateString()
  timestamp: string;
}

export class ExtraEventsBody {
  @IsUUID()
  @IsOptional()
  moduleBeginUuid?: string;

  @IsUUID()
  @IsOptional()
  moduleCompleteUuid?: string;

  @IsUUID()
  @IsOptional()
  courseCompleteUuid?: string;
}

export class IngestEventBody {
  @IsUUID()
  uuid: string;

  @IsId()
  cardId: number;

  @IsId()
  moduleId: number;

  @IsId()
  courseId: number;

  @IsBoolean()
  correct: boolean;

  @IsBoolean()
  skip: boolean;

  @IsBoolean()
  retryable: boolean;

  @IsNumber()
  duration: number;

  @IsDateString()
  timestamp: string;

  @IsOptional()
  answer?: unknown;

  @IsOptional()
  @ValidateNested()
  extraEvents?: ExtraEventsBody;
}
