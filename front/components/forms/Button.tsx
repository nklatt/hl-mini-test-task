import classNames from "classnames";
import type React from "react";

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
}: ButtonProps) =>
  classNames("rounded disabled:opacity-50 font-bold text-center", className, {
    "cursor-pointer": !disabled,
    "w-full block": !inline,
    "inline-block": inline,
    "text-white bg-blue-500 hover:bg-blue-800":
      !secondary && !danger && !className?.includes("bg-"),
    "text-gray-800 bg-gray-300 hover:bg-gray-200": secondary,
    "text-red-50 bg-red-500 hover:bg-red-400": danger,
    "px-8 py-4": !small && !medium,
    "px-4 py-2": medium,
    "px-2 py-1": small,
  });

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
    disabled={props.loading || props.disabled}
    {...withoutButtonProps(props)}
    className={btnClasses(props)}
  >
    {props.loading ? "Loading..." : (props.children ?? "Submit")}
  </button>
);
