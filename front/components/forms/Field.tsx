import classNames from "classnames";

export const Field = ({
  label,
  description,
  required,
  children,
  className,
  htmlFor,
}: {
  label?: string;
  description?: React.ReactNode;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) => {
  if (!label) {
    return children;
  }

  return (
    <div className={classNames("block", className)}>
      <label htmlFor={htmlFor} className="mb-1 text-gray-500 block">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {description && (
        <p className="text-xs text-gray-500 mb-4">{description}</p>
      )}
    </div>
  );
};
