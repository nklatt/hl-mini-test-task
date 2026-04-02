export const replaceParams = (path: string, params?: Record<string, any>) => {
  if (!params) return path;

  let url = path;
  const placeholders = path.match(/:[a-zA-Z]+/g) || [];

  for (const placeholder of placeholders) {
    const key = placeholder.slice(1);
    if (!(key in params) || params[key] === undefined || params[key] === null) {
      throw new Error(`Missing parameter: ${key}`);
    }
    url = url.replace(placeholder, params[key].toString());
  }

  return url;
};

export class ApiError extends Error {
  public statusCode: number;
  constructor(msg: string, statusCode: number) {
    super();
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.message = msg;
  }
}

export const isHavenError = (result: any) => {
  if (typeof result === "object" && result !== null) {
    const e = result as { message?: string; statusCode?: number };
    if (
      e.message !== undefined &&
      e.statusCode !== undefined &&
      e.statusCode >= 400
    ) {
      return true;
    }
  }
  return false;
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof ApiError || error instanceof Error) {
    return error.message;
  }
  return `Unexpected error: ${JSON.stringify(error)}`;
};
