import classNames from "classnames";

export default function Loader({
  centered,
  inline,
  small,
}: {
  centered?: boolean;
  inline?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={classNames({
        "flex-grow flex justify-center items-center": centered,
        "inline-block": inline,
      })}
    >
      {/* biome-ignore lint/a11y/useSemanticElements: using div with role instead of output element */}
      <div
        className={classNames(
          "animate-spin rounded-full border-solid border-current border-r-transparent",
          {
            "h-8 w-8 border-4": !small,
            "h-4 w-4 border-2": small,
          },
        )}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
