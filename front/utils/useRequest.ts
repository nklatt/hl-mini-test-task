"use client";

import { useCallback, useState, useTransition } from "react";

import { getErrorMessage } from "./api/fetchUtils";

type RunFunc<T> = (
  promise: Promise<T>,
  onSuccess?: (data: T) => void,
  onFailure?: (error: unknown) => void,
) => void;

type ReturnValue<T> = {
  loading: boolean;
  error: string;
  run: RunFunc<T>;
  resp: T | undefined;
};

type Options = {
  loading?: boolean;
};

export const useRequest = <T extends (...args: any[]) => Promise<any>>(
  options?: Options,
): ReturnValue<Awaited<ReturnType<T>>> => {
  type ResponseType = Awaited<ReturnType<T>>;
  const [resp, setResponse] = useState<ResponseType | undefined>(undefined);
  const [loading, setLoading] = useState(!!options?.loading);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const run = useCallback<RunFunc<ResponseType>>(
    async (promise, onSuccess, onFailure) => {
      setLoading(true);
      setError("");

      try {
        const resp = await promise;

        startTransition(() => {
          setResponse(resp);
          setLoading(false);
          try {
            onSuccess?.(resp);
          } catch (e) {
            console.error("Error in onSuccess callback:", e);
          }
        });
      } catch (error) {
        setError(getErrorMessage(error));
        setResponse(undefined);
        setLoading(false);
        try {
          onFailure?.(error);
        } catch (e) {
          console.error("Error in onFailure callback:", e);
        }
      }
    },
    [],
  );

  return { loading: loading || isPending, error, run, resp };
};
