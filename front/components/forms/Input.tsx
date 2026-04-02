import classNames from "classnames";
import type React from "react";

import { Field } from "./Field";

export default function Input({
  className,
  label,
  description,
  inline,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  description?: string;
  inline?: boolean;
}) {
  return (
    <Field
      label={label}
      htmlFor={rest.id}
      description={description}
      required={rest.required}
    >
      <input
        className={classNames(
          "px-3 py-2 rounded bg-[#F0F0F0] border-[#DFE2E4] border shadow-inner",
          {
            "inline-block": inline,
            "block w-full": !inline,
            "mb-4": !inline && !description,
            "mb-1": description,
          },
          className,
        )}
        {...rest}
      />
    </Field>
  );
}
