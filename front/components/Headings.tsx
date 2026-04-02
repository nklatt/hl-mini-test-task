import classNames from "classnames";
import type React from "react";

export const H2 = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <h2 className={classNames(className, "text-2xl font-bold")}>{children}</h2>
);

export const H3 = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <h3 className={classNames(className, "text-xl font-bold")}>{children}</h3>
);

export const H4 = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => <h4 className={classNames(className, "font-bold")}>{children}</h4>;
