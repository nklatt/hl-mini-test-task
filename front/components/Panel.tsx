import classNames from "classnames";
import type { ReactNode } from "react";

import { H3 } from "./Headings";

export default function Panel({
  children,
  className,
  id,
  subtitle,
  title,
  tight,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  subtitle?: ReactNode;
  title?: ReactNode;
  tight?: boolean;
}) {
  return (
    <div
      id={id}
      className={classNames(
        className,
        className?.includes("shadow-") ? "" : "shadow-md",
        className?.includes("bg-") ? "" : "bg-white",
        className?.includes("mb-") ? "" : "mb-6",
        "rounded-md p-4 pt-3",
      )}
    >
      {title && (
        <H3
          className={classNames({
            "mb-4": !(subtitle || tight),
            "mb-1": subtitle || tight,
          })}
        >
          {title}
        </H3>
      )}
      {subtitle && (
        <p
          className={classNames(
            "text-sm text-gray-500",
            tight ? "mb-1" : "mb-2",
          )}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
