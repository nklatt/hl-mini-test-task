"use client";

import { useCallback, useState } from "react";

export const useForm = <T extends Record<string, any>>(
  initialState: T,
  onSubmit: (
    data: T,
    setFields: React.Dispatch<React.SetStateAction<T>>,
    submitter?: string,
  ) => void,
) => {
  const [fields, setFields] = useState(initialState);

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const value =
        e.target.type === "checkbox"
          ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
          : e.target.value;
      setFields((prev) => ({ ...prev, [e.target.name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent,
      submitter?: string,
    ) => {
      e.preventDefault();
      onSubmit?.(fields, setFields, submitter);
    },
    [fields, onSubmit],
  );

  return {
    fields,
    setFields,
    handleInputChange,
    handleSubmit,
  };
};
