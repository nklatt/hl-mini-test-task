// Simplified answers utility for mini app (radio only)

export type RadioOption = {
  label: string;
  correct: boolean;
};

export type RadioAnswer = {
  selectedIndex: number;
};

export function validateRadioAnswer(
  answer: RadioAnswer,
  options: RadioOption[],
): boolean {
  const selected = options[answer.selectedIndex];
  return selected?.correct ?? false;
}
