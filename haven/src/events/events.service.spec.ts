import { type DeepMockProxy, mockDeep } from "jest-mock-extended";

import type { PrismaService } from "src/prisma/prisma.service";
import { EventsService } from "./events.service";

describe("EventsService", () => {
  let service: EventsService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(() => {
    prisma = mockDeep<PrismaService>();
    service = new EventsService(prisma);
  });

  describe("ingestEvent", () => {
    it("saves a card submit event", async () => {
      const fakeEvent = {
        id: 1,
        uuid: "test-uuid",
        card_id: 1,
        module_id: 1,
        course_id: 1,
        user_id: 1,
        answer: null,
        correct: true,
        skip: false,
        retryable: false,
        duration: 5000,
        timestamp: new Date(),
        created_at: new Date(),
      };

      prisma.card_submit_events.upsert.mockResolvedValue(fakeEvent as any);
      (prisma.$transaction as jest.MockedFunction<any>).mockImplementation(
        async (queries: any[]) => {
          return Promise.all(
            queries.map((q) => (typeof q === "function" ? q(prisma) : q)),
          );
        },
      );

      const _result = await service.ingestEvent(1, {
        uuid: "test-uuid",
        cardId: 1,
        moduleId: 1,
        courseId: 1,
        correct: true,
        skip: false,
        retryable: false,
        duration: 5000,
        timestamp: new Date().toISOString(),
      });

      expect(prisma.card_submit_events.upsert).toHaveBeenCalledWith(
        expect.objectContaining({ where: { uuid: "test-uuid" } }),
      );
    });

    it("is idempotent when the same uuid is submitted twice", async () => {
      const fakeEvent = {
        id: 1,
        uuid: "test-uuid",
        card_id: 1,
        module_id: 1,
        course_id: 1,
        user_id: 1,
        answer: null,
        correct: true,
        skip: false,
        retryable: false,
        duration: 5000,
        timestamp: new Date(),
        created_at: new Date(),
      };

      prisma.card_submit_events.upsert.mockResolvedValue(fakeEvent as any);
      (prisma.$transaction as jest.MockedFunction<any>).mockImplementation(
        async (queries: any[]) => {
          return Promise.all(
            queries.map((q) => (typeof q === "function" ? q(prisma) : q)),
          );
        },
      );

      const body = {
        uuid: "test-uuid",
        cardId: 1,
        moduleId: 1,
        courseId: 1,
        correct: true,
        skip: false,
        retryable: false,
        duration: 5000,
        timestamp: new Date().toISOString(),
      };

      await service.ingestEvent(1, body);
      await service.ingestEvent(1, body);

      // upsert was called twice, but both calls use the same uuid
      expect(prisma.card_submit_events.upsert).toHaveBeenCalledTimes(2);
      // The upsert's update clause ensures no duplicate is created
      expect(prisma.card_submit_events.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { uuid: "test-uuid" },
          update: expect.objectContaining({ timestamp: expect.any(Date) }),
        }),
      );
    });
  });

});
