export function indexBy<T>(
  arr: T[],
  key: (item: T) => string | number,
): Record<string | number, T> {
  return arr.reduce(
    (acc, item) => {
      acc[key(item)] = item;
      return acc;
    },
    {} as Record<string | number, T>,
  );
}
