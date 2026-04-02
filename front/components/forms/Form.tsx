import classNames from "classnames";
import type React from "react";
import type { ComponentProps, ReactNode } from "react";

import Message from "../Message";
import { Submit } from "./Button";

export default function Form({
  loading,
  error,
  children,
  submit,
  ...rest
}: React.FormHTMLAttributes<HTMLFormElement> & {
  loading?: boolean;
  error?: string;
  submit?: Omit<ComponentProps<typeof Submit>, "loading">;
  children?: ReactNode;
}) {
  return (
    <>
      {error && <Message error>{error}</Message>}
      <div className={classNames({ "opacity-50": loading })}>
        <form {...rest}>
          {children}
          <Submit loading={loading} {...submit} />
        </form>
      </div>
    </>
  );
}
