import { Transform } from "class-transformer";

// Trims leading and trailing whitespace from string values,
// passing non-string values through unchanged.
export function Trim() {
  return Transform(({ value }) =>
    typeof value === "string" ? value.trim() : value,
  );
}
