"use client";

import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type { CardEntity } from "@/hl-common/entities/Cards";
import { card_interaction_type } from "@/hl-common/PrismaEnums";

import { ButtonLink } from "@/components/ButtonLink";
import { H2 } from "@/components/Headings";
import CardInteractionNext from "@/components/interactions/CardInteractionNext";
import CardInteractionRadio from "@/components/interactions/CardInteractionRadio";
import Panel from "@/components/Panel";
import { ingestEvent } from "@/utils/api/client";

type Props = {
  module: { id: number; title: string; course_id: number; cards: CardEntity[] };
  courseId: number;
  userId: number;
};

const progressKey = (userId: number, moduleId: number) =>
  `progress-${userId}-module-${moduleId}`;

const beginUuidKey = (userId: number, moduleId: number) =>
  `begin-uuid-${userId}-module-${moduleId}`;

const getOrCreateBeginUuid = (userId: number, moduleId: number): string => {
  const key = beginUuidKey(userId, moduleId);
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const uuid = uuidv4();
  localStorage.setItem(key, uuid);
  return uuid;
};

export default function ModuleClient({ module, courseId, userId }: Props) {
  const { cards, id: moduleId } = module;

  const [currentCardIndex, setCurrentCardIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem(progressKey(userId, moduleId));
    const parsed = stored ? Number.parseInt(stored, 10) : 0;
    // If progress is past the end (module was completed), start from done state
    return Math.min(parsed, cards.length);
  });

  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(progressKey(userId, moduleId));
    const parsed = stored ? Number.parseInt(stored, 10) : 0;
    return parsed >= cards.length && cards.length > 0;
  });
  const [submitting, setSubmitting] = useState(false);

  // Stable UUIDs — persisted to localStorage so they survive page reloads and retries
  const moduleBeginUuid = useState(() => getOrCreateBeginUuid(userId, moduleId))[0];
  const moduleCompleteUuid = useState(() => uuidv4())[0];
  const hasBegunRef = useRef(false);

  const currentCard = cards[currentCardIndex];
  const isFirst = currentCardIndex === 0;

  const recordAttempt = async (answer?: { selectedIndex: number }) => {
    if (!currentCard) return;
    setSubmitting(true);

    const isLastCard = currentCardIndex === cards.length - 1;
    const sendBegin = isFirst && !hasBegunRef.current;
    if (sendBegin) hasBegunRef.current = true;

    await ingestEvent({
      body: {
        uuid: uuidv4(),
        cardId: currentCard.id,
        moduleId,
        courseId,
        answer: answer ? answer.selectedIndex : null,
        correct: answer
          ? (currentCard.options?.[answer.selectedIndex]?.correct ?? false)
          : false,
        skip: false,
        retryable: false,
        duration: 0,
        timestamp: new Date().toISOString(),
        extraEvents: {
          ...(sendBegin ? { moduleBeginUuid } : {}),
          ...(isLastCard ? { moduleCompleteUuid } : {}),
        },
      },
    });

    setSubmitting(false);
  };

  const advanceCard = () => {
    if (!currentCard) return;
    const next = currentCardIndex + 1;
    const isLastCard = currentCardIndex === cards.length - 1;

    // Write progress to localStorage, scoped to this user
    localStorage.setItem(progressKey(userId, moduleId), String(next));
    setCurrentCardIndex(next);

    if (isLastCard) {
      setDone(true);
    }
  };

  const advance = async (answer?: { selectedIndex: number }) => {
    await recordAttempt(answer);
    advanceCard();
  };

  if (done) {
    return (
      <div>
        <H2 className="mb-4">{module.title}</H2>
        <Panel>
          <p className="text-green-700 font-semibold text-lg">
            Module complete!
          </p>
          <p className="text-gray-600 mt-2">
            You have finished all {cards.length} cards in this module.
          </p>
          <ButtonLink
            href={`/courses/${courseId}`}
            inline
            medium
            className="mt-4"
          >
            Back to course
          </ButtonLink>
        </Panel>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div>
        <H2 className="mb-4">{module.title}</H2>
        <Panel>
          <p className="text-gray-500">No cards in this module.</p>
        </Panel>
      </div>
    );
  }

  return (
    <div key={currentCard.id}>
      <H2 className="mb-1">{module.title}</H2>
      <p className="text-sm text-gray-500 mb-6">
        Card {currentCardIndex + 1} of {cards.length}
      </p>

      <Panel title={currentCard.title}>
        <p className="text-gray-700 mb-6">{currentCard.body}</p>

        {currentCard.interaction_type === card_interaction_type.radio &&
        currentCard.options ? (
          <CardInteractionRadio
            options={currentCard.options}
            onAnswer={(selectedIndex) => recordAttempt({ selectedIndex })}
            onNext={advanceCard}
            disabled={submitting}
          />
        ) : (
          <CardInteractionNext onNext={() => advance()} disabled={submitting} />
        )}
      </Panel>
    </div>
  );
}
