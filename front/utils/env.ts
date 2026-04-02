if (!process.env.NEXT_PUBLIC_HAVEN_URL) {
  throw new Error("NEXT_PUBLIC_HAVEN_URL environment variable is not defined");
}

export const publicHavenUrl = process.env.NEXT_PUBLIC_HAVEN_URL;
