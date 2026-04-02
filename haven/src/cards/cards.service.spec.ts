import { mock } from "jest-mock-extended";

import type { PrismaService } from "src/prisma/prisma.service";
import { CardsService } from "./cards.service";

describe("CardsService", () => {
  let service: CardsService;
  let prisma: ReturnType<typeof mock<PrismaService>>;

  beforeEach(() => {
    prisma = mock<PrismaService>();
    service = new CardsService(prisma);
  });

  describe("validateAnswer", () => {
    const options = [
      { label: "Correct answer", correct: true },
      { label: "Wrong answer A", correct: false },
      { label: "Wrong answer B", correct: false },
      { label: "Wrong answer C", correct: false },
    ];

    it("returns correct: true when the right option is selected", () => {
      const result = service.validateAnswer(options, 0);
      expect(result).toBe(true);
    });

    it("returns correct: false when a wrong option is selected", () => {
      const result = service.validateAnswer(options, 1);
      expect(result).toBe(false);
    });

    it.todo("handles a card with no correct option gracefully");
  });
});
