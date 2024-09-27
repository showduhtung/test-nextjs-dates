type PageParams<T> = Record<keyof T, string>;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?(Z|[+-]\d{2}:\d{2})?$/;

const isValidDate = (date: string) => !isNaN(new Date(date).getTime());

function parseParams<T extends Record<string, unknown>>(entries: Record<string, string>) {
  const queries = Object.entries(entries).reduce((acc, [key, val]) => {
    const value = decodeURIComponent(val);
    if (isValidDate(value)) return { ...acc, [key]: new Date(value) };
    return { ...acc, [key]: value };
  }, {});
  return queries as T;
}
type PageSearchParams<T> = Partial<Record<keyof T, string>>;
function parseSearchParams<T extends Record<string, unknown>>(entries: Record<string, string>) {
  const queries = Object.entries(entries).reduce((acc, [key, val]) => {
    const value = JSON.parse(val);
    if (DATE_REGEX.test(value)) return { ...acc, [key]: new Date(value) };

    // better way to check if value is a valid date string?
    if (Array.isArray(value) && value.every((v) => DATE_REGEX.test(v))) {
      return {
        ...acc,
        [key]: value.map((v) => new Date(v) as Date) as [Date, Date],
      };
    }
    return { ...acc, [key]: value };
  }, {});
  return queries as T;
}

class SearchParams extends URLSearchParams {
  set(key: string, value: unknown) {
    super.set(key, JSON.stringify(value));
  }
}

export type { PageSearchParams, PageParams };
export { parseSearchParams, parseParams, SearchParams };
