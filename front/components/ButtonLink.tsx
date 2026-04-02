import classNames from "classnames";
import Link, { type LinkProps } from "next/link";
import type React from "react";
import type { AnchorHTMLAttributes } from "react";

export type ButtonProps = {
  secondary?: boolean;
  danger?: boolean;
  small?: boolean;
  medium?: boolean;
  inline?: boolean;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

const btnClasses = ({
  secondary,
  danger,
  small,
  medium,
  inline,
  disabled,
  className,
}: ButtonProps) => {
  return classNames("rounded disabled:opacity-50", className, {
    "cursor-pointer": !disabled,
    "w-full block": !inline,
    "inline-block": inline,
    "text-center": true,
    "text-white bg-blue-500 active:bg-blue-800 hover:bg-blue-800":
      !secondary && !danger && !className?.includes("bg-"),
    "text-gray-800 bg-gray-300 active:bg-gray-200 hover:bg-gray-200": secondary,
    "text-red-50 bg-red-500 active:bg-red-400 hover:bg-red-400": danger,
    "px-8 py-4": !small && !medium,
    "px-4 py-2": medium,
    "px-2 py-1": small,
    "font-bold": true,
  });
};

const withoutButtonProps = (props: any) => {
  const {
    secondary,
    danger,
    small,
    medium,
    inline,
    loading,
    className,
    children,
    disabled,
    ...rest
  } = props;
  return rest;
};

export const ButtonLink = (
  props: ButtonProps & LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>,
) => {
  return (
    <Link {...withoutButtonProps(props)} className={btnClasses(props)}>
      {props.children}
    </Link>
  );
};

export const Button = ({
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...withoutButtonProps(props)} className={btnClasses(props)}>
    {children}
  </button>
);

export const Submit = (
  props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>,
) => (
  <button
    type="submit"
    disabled={props.loading}
    {...withoutButtonProps(props)}
    className={btnClasses(props)}
  >
    {props.loading ? "Loading..." : (props.children ?? "Submit")}
  </button>
);
