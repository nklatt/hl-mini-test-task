"use client";

import { useState } from "react";

import type { RadioOption } from "@/hl-common/entities/Cards";

import { Button, Submit } from "../forms/Button";

export default function CardInteractionRadio({
  options,
  onAnswer,
  onNext,
  disabled,
}: {
  options: RadioOption[];
  onAnswer: (selectedIndex: number) => void;
  onNext: () => void;
  disabled?: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected !== null) {
      onAnswer(selected);
      setSubmitted(true);
    }
  };

  const handleNext = () => {
    onNext();
  };

  const isCorrect = selected !== null && options[selected]?.correct;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {options.map((option, idx) => {
        let borderClass = "border-gray-200 hover:bg-gray-50";
        if (submitted) {
          if (option.correct) {
            borderClass = "border-green-500 bg-green-50";
          } else if (idx === selected) {
            borderClass = "border-red-400 bg-red-50";
          }
        }
        return (
          <label
            // biome-ignore lint/suspicious/noArrayIndexKey: options are positional
            key={idx}
            className={`flex items-center gap-3 p-3 rounded border cursor-pointer ${borderClass}`}
          >
            <input
              type="radio"
              name="option"
              value={idx}
              checked={selected === idx}
              onChange={() => setSelected(idx)}
              disabled={disabled || submitted}
            />
            <span>{option.label}</span>
          </label>
        );
      })}
      {!submitted ? (
        <Submit disabled={selected === null || disabled} medium>
          Submit
        </Submit>
      ) : (
        <div className="space-y-3">
          <p
            className={`font-semibold ${isCorrect ? "text-green-700" : "text-red-600"}`}
          >
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
          {isCorrect ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={disabled}
              medium
            >
              Next
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setSelected(null);
              }}
              medium
            >
              Try again
            </Button>
          )}
        </div>
      )}
    </form>
  );
}
