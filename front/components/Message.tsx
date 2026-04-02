import classNames from "classnames";

interface MessageProps {
  warning?: boolean;
  success?: boolean;
  error?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function Message({
  className,
  warning,
  success,
  error,
  children,
}: MessageProps) {
  return (
    <div
      className={classNames(
        className,
        "mb-4 rounded-lg px-4 py-3 text-base border-solid border",
        {
          "bg-gray-100 text-gray-800 border-gray-200":
            !warning && !success && !error,
        },
        { "bg-orange-100 text-orange-800 border-orange-200": warning },
        { "bg-green-100 text-green-800 border-green-200": success },
        { "bg-red-100 text-red-800 border-red-200": error },
      )}
      role="alert"
    >
      {children}
    </div>
  );
}
