// Selected Prisma enums for the mini application.

export const role = {
  registered: "registered",
  admin: "admin",
} as const;

export type role = (typeof role)[keyof typeof role];

export const card_interaction_type = {
  radio: "radio",
  next: "next",
} as const;

export type card_interaction_type =
  (typeof card_interaction_type)[keyof typeof card_interaction_type];
