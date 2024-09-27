type PageParams<T> = Record<keyof T, string>;

const isValidDate = (date: string) => !isNaN(new Date(date).getTime());

function parseParams<T extends Record<string, unknown>>(
  entries: Record<string, string>
) {
  const queries = Object.entries(entries).reduce((acc, [key, val]) => {
    const value = decodeURIComponent(val);
    if (isValidDate(value)) return { ...acc, [key]: new Date(value) };
    return { ...acc, [key]: value };
  }, {});
  return queries as T;
}

type SearchParams<T> = Partial<Record<keyof T, string>>;
function parseSearchParams<T extends Record<string, unknown>>(
  entries: Record<string, string>
) {
  const queries = Object.entries(entries).reduce((acc, [key, val]) => {
    const value = decodeURIComponent(val);
    if (isValidDate(value)) return { ...acc, [key]: new Date(value) };
    else if (Array.isArray(value) && value.every(isValidDate)) {
      return { ...acc, [key]: value.map((v) => new Date(v)) };
    }
    return { ...acc, [key]: value };
  }, {});
  return queries as T;
}

export type { SearchParams, PageParams };
export { parseSearchParams, parseParams };
