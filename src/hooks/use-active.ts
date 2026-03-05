'use client';

import { usePathname } from 'next/navigation';

export type UseActiveOptions = {
  exact?: boolean;
  includeRoot?: boolean;
  maxSegments?: number;
};

const stripTrailingSlash = (v: string) =>
  v !== '/' && v.endsWith('/') ? v.slice(0, -1) : v;

const clampSegments = (path: string, maxSegments?: number) => {
  if (!maxSegments || maxSegments < 1) return path;
  const parts = path.split('/').filter(Boolean).slice(0, maxSegments);
  return parts.length ? `/${parts.join('/')}` : '/';
};

export function useActive(url?: string | null, opts: UseActiveOptions = {}): boolean {
  if (!url) return false;
  const { exact = false, includeRoot = false, maxSegments = 3 } = opts;
  const pathname = usePathname() ?? '/';

  const normalizeCurrent = (value: string) => {
    if (!value.startsWith('/')) return value;
    return stripTrailingSlash(value);
  };

  const normalizeTarget = (value: string) => {
    if (!value.startsWith('/')) return value;
    const trimmed = stripTrailingSlash(value);
    return clampSegments(trimmed, maxSegments);
  };

  const current = normalizeCurrent(pathname);
  const target = normalizeTarget(url);

  if (exact) return current === target;

  const isFullMatch = current === target;
  const isPartialMatch =
    target !== '/' || includeRoot ? current.startsWith(target) : false;

  return isFullMatch || isPartialMatch;
}
