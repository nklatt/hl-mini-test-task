"use client";

export default function CardInteractionNext({
  onNext,
  disabled,
}: {
  onNext: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onNext}
      disabled={disabled}
      className="w-full px-8 py-4 rounded font-bold text-white bg-blue-500 hover:bg-blue-800 disabled:opacity-50"
    >
      Next
    </button>
  );
}
