/**
 * useFindhelp.ts — React hook for Findhelp API integration
 * Fetches local social care programs from the Findhelp network via our proxy API.
 */

import { useState, useEffect, useCallback } from 'react';

// Types matching our API proxy response
export interface FindhelpProgram {
  id: string;
  name: string;
  description: string;
  organization: {
    name: string;
    website?: string;
    phone?: string;
  };
  address?: {
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  categories: string[];
  servingTags: string[];
  applicationProcess?: string;
  eligibility?: string;
  fees?: string;
  hours?: string;
  website?: string;
  phone?: string;
  distance?: number;
  isClaimed: boolean;
  lastUpdated?: string;
}

export interface FindhelpSearchResponse {
  programs: FindhelpProgram[];
  totalResults: number;
  page: number;
  pageSize: number;
  postalCode: string;
  searchedCategory?: string;
}

interface UseFindhelp {
  programs: FindhelpProgram[];
  totalResults: number;
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
  search: (zip: string, category?: string) => Promise<void>;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

const CACHE_KEY = 'dh_findhelp_cache';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function getCached(zip: string, category?: string): FindhelpSearchResponse | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw);
    const key = `${zip}_${category || 'all'}`;
    const entry = cache[key];
    if (!entry) return null;
    if (Date.now() - entry.ts > CACHE_TTL) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function setCache(zip: string, data: FindhelpSearchResponse, category?: string) {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const cache = raw ? JSON.parse(raw) : {};
    const key = `${zip}_${category || 'all'}`;
    cache[key] = { data, ts: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore storage errors
  }
}

export function useFindhelp(): UseFindhelp {
  const [programs, setPrograms] = useState<FindhelpProgram[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(true);
  const [currentZip, setCurrentZip] = useState('');
  const [currentCategory, setCurrentCategory] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 25;

  const search = useCallback(async (zip: string, category?: string) => {
    if (!/^\d{5}$/.test(zip)) return;

    setCurrentZip(zip);
    setCurrentCategory(category);
    setCurrentPage(1);
    setError(null);

    // Check cache first
    const cached = getCached(zip, category);
    if (cached) {
      setPrograms(cached.programs);
      setTotalResults(cached.totalResults);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({ zip, page: '1', pageSize: String(PAGE_SIZE) });
      if (category) params.set('category', category);

      const res = await fetch(`/api/findhelp?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'api_not_configured') {
          setIsConfigured(false);
          return;
        }
        throw new Error(data.message || 'Failed to fetch programs');
      }

      setPrograms(data.programs);
      setTotalResults(data.totalResults);
      setCache(zip, data, category);
    } catch (err: any) {
      setError(err.message || 'Failed to search programs');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!currentZip || loading) return;
    const nextPage = currentPage + 1;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        zip: currentZip,
        page: String(nextPage),
        pageSize: String(PAGE_SIZE),
      });
      if (currentCategory) params.set('category', currentCategory);

      const res = await fetch(`/api/findhelp?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setPrograms(prev => [...prev, ...data.programs]);
      setCurrentPage(nextPage);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentZip, currentCategory, currentPage, loading]);

  const hasMore = programs.length < totalResults;

  return { programs, totalResults, loading, error, isConfigured, search, loadMore, hasMore };
}
