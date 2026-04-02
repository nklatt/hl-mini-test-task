import classNames from "classnames";
import type React from "react";

import { Field } from "./Field";

export default function TextArea({
  className,
  label,
  description,
  ...rest
}: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value"> & {
  value?: string;
  label?: string;
  description?: React.ReactNode;
}) {
  return (
    <Field
      label={label}
      htmlFor={rest.id}
      description={description}
      required={rest.required}
    >
      <textarea
        className={classNames(
          className,
          "block px-3 py-2 w-full rounded bg-[#F8F8F8] border-[#DFE2E4] border shadow-inner",
          {
            "mb-4": !description,
            "mb-1": description,
          },
        )}
        {...rest}
      />
    </Field>
  );
}
