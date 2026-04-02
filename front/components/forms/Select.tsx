import classNames from "classnames";

import { Field } from "./Field";

export default function Select({
  className,
  label,
  description,
  disabled,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <Field
      htmlFor={rest.id}
      label={label}
      description={description}
      required={rest.required}
    >
      <select
        className={classNames(
          className,
          { "opacity-50": disabled },
          "w-full md:w-auto",
          { "mb-4": !description },
          { "mb-1": description },
          "block px-3 py-2.5 rounded bg-[#F0F0F0] border-[#DFE2E4] border shadow-inner",
        )}
        disabled={disabled}
        {...rest}
      />
    </Field>
  );
}
