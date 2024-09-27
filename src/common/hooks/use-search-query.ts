"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseSearchParams } from "../utilities";

type SearchHookInterface<T> = {
  queries: T;
  search: (payload: T, options?: { scroll?: boolean }) => void;
};

function useSearchQuery<T extends Record<string, unknown>>(
  defaultState?: T,
): SearchHookInterface<T> {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const entries = Object.fromEntries(searchParams);
  const queries = parseSearchParams<T>(entries);

  function search(payload: Record<string, unknown>, options?: { scroll?: boolean }) {
    const query = new URLSearchParams();

    Object.entries({ ...queries, ...payload }).forEach(([key, value]) => {
      if (Array.isArray(value) && isDefaultArray(value, (defaultState?.[key] || []) as unknown[]))
        return;
      if (defaultState?.[key] === value) return;
      else if (value === undefined) return;
      else if (value === "") return;
      else query.set(key, JSON.stringify(value));
    });

    router.replace(Boolean(query?.size) ? `${pathname}?${query.toString()}` : pathname, {
      scroll: options?.scroll,
    });
  }

  return { queries, search };
}

const isDefaultArray = (a: unknown[], b: unknown[]) =>
  a.length === b.length && a.every((val, index) => val === b[index]);

export { useSearchQuery };
