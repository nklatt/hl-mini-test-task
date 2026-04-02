import { notFound } from "next/navigation";

import type { Req } from "@/hl-common/api/routes";

import { ApiError, isHavenError, replaceParams } from "./fetchUtils";

const internalHavenUrl = process.env.INTERNAL_HAVEN_URL;

export const serverFetch = async <T>(
  req: Req,
  args?: {
    params?: Record<string, any>;
    query?: Record<string, any>;
    body?: any;
  },
  authToken?: string,
): Promise<T> => {
  const { params, query, body } = args || {};

  let url = replaceParams(req.path, params);
  if (query) {
    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries(query)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ),
    ).toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  if (!internalHavenUrl) {
    throw new Error("INTERNAL_HAVEN_URL environment variable is not defined");
  }

  const fullUrl = `${internalHavenUrl}/api${url}`;

  const response = await fetch(fullUrl, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(authToken ? { Cookie: `mini-jwt=${authToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const result = await response.json();

  if (isHavenError(result)) {
    if (result.statusCode === 404) {
      return notFound();
    }
    throw new ApiError(result.message || "Unknown error", result.statusCode);
  }

  return result;
};
