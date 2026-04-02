import classNames from "classnames";
import type React from "react";

export default function BasicPage({
  wide,
  header,
  children,
}: {
  wide?: boolean;
  header?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames("mx-auto px-4 pb-6 flex flex-col min-h-dvh", {
        "max-w-md": !wide,
        "max-w-2xl": wide,
      })}
    >
      <header className="text-center py-6">
        {header ?? <div className="h-8" />}
        <h1 className="text-2xl font-bold text-blue-600">Mini HealthLearn</h1>
      </header>
      <main className="flex-grow flex flex-col">{children}</main>
    </div>
  );
}
