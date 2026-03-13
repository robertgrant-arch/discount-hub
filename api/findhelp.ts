/**
 * api/findhelp.ts — Findhelp API Proxy for HealthCare Select Benefits Hub
 * 
 * Vercel serverless function that proxies requests to the Findhelp API.
 * Searches for local social care programs by ZIP code and optional category.
 * 
 * Findhelp API requires an enterprise API key obtained through their
 * partnership program: https://company.findhelp.com/products/customer-integrations/
 * 
 * Environment variable required:
 *   FINDHELP_API_KEY — Your Findhelp API bearer token
 *   FINDHELP_API_BASE — Base URL (default: https://api.findhelp.com)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// ── Findhelp API response types ──────────────────────────────────────

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
  categories: string[];        // e.g. ["Food", "Housing", "Health"]
  servingTags: string[];       // e.g. ["Seniors", "Veterans", "Disabilities"]
  applicationProcess?: string;
  eligibility?: string;
  fees?: string;
  hours?: string;
  website?: string;
  phone?: string;
  distance?: number;           // miles from searched ZIP
  isClaimed: boolean;          // verified by the organization
  lastUpdated?: string;        // ISO date
}

export interface FindhelpSearchResponse {
  programs: FindhelpProgram[];
  totalResults: number;
  page: number;
  pageSize: number;
  postalCode: string;
  searchedCategory?: string;
}

export interface FindhelpErrorResponse {
  error: string;
  message: string;
}

// ── Category mapping: Findhelp → HealthCare Select Benefits Hub ─────────────────────────

const FINDHELP_CATEGORIES = [
  'Food',
  'Housing',
  'Goods',
  'Transit',
  'Health',
  'Money',
  'Care',
  'Education',
  'Work',
  'Legal',
] as const;

type FindhelpCategory = typeof FINDHELP_CATEGORIES[number];

const CATEGORY_MAP: Record<FindhelpCategory, string> = {
  Food: 'Food & Nutrition',
  Housing: 'Housing',
  Goods: 'Financial Tools',
  Transit: 'Transportation',
  Health: 'Healthcare',
  Money: 'Income Support',
  Care: 'Healthcare',
  Education: 'Employment',
  Work: 'Employment',
  Legal: 'Legal Rights',
};

// ── Main handler ─────────────────────────────────────────────────────

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { zip, category, page = '1', pageSize = '25' } = req.query;

  if (!zip || typeof zip !== 'string' || !/^\d{5}$/.test(zip)) {
    return res.status(400).json({
      error: 'invalid_zip',
      message: 'A valid 5-digit US ZIP code is required.',
    });
  }

  const apiKey = process.env.FINDHELP_API_KEY;
  const apiBase = process.env.FINDHELP_API_BASE || 'https://api.findhelp.com';

  if (!apiKey) {
    return res.status(503).json({
      error: 'api_not_configured',
      message:
        'Findhelp API key is not configured. Contact support to enable local program search.',
    });
  }

  try {
    // Build Findhelp API request URL
    const params = new URLSearchParams({
      postal_code: zip,
      page: String(page),
      page_size: String(pageSize),
    });

    if (category && typeof category === 'string') {
      params.set('service_tag', category);
    }

    const url = `${apiBase}/v1/programs/search?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Findhelp API error ${response.status}:`, errorText);
      return res.status(response.status).json({
        error: 'findhelp_api_error',
        message: `Findhelp API returned ${response.status}`,
      });
    }

    const data = await response.json();

    // Transform Findhelp response into our normalized format
    const programs: FindhelpProgram[] = (data.programs || data.results || []).map(
      (p: any) => ({
        id: p.id || p.program_id || '',
        name: p.name || p.program_name || '',
        description: p.description || p.short_description || '',
        organization: {
          name: p.organization?.name || p.provider_name || '',
          website: p.organization?.website || p.provider_url || undefined,
          phone: p.organization?.phone || p.provider_phone || undefined,
        },
        address: p.address
          ? {
              street1: p.address.street1 || p.address.address1,
              street2: p.address.street2 || p.address.address2,
              city: p.address.city,
              state: p.address.state,
              zip: p.address.zip || p.address.postal_code,
            }
          : undefined,
        categories: (p.categories || p.service_tags || []).map(
          (c: any) => (typeof c === 'string' ? c : c.name || c.label)
        ),
        servingTags: (p.serving_tags || p.attributes || []).map(
          (t: any) => (typeof t === 'string' ? t : t.name || t.label)
        ),
        applicationProcess: p.application_process || p.how_to_apply || undefined,
        eligibility: p.eligibility || p.requirements || undefined,
        fees: p.fees || undefined,
        hours: p.hours || p.schedule || undefined,
        website: p.website || p.url || undefined,
        phone: p.phone || p.phone_number || undefined,
        distance: p.distance ?? p.miles ?? undefined,
        isClaimed: p.is_claimed ?? p.claimed ?? false,
        lastUpdated: p.last_updated || p.updated_at || undefined,
      })
    );

    // Cache for 1 hour
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

    return res.status(200).json({
      programs,
      totalResults: data.total_count || data.total || programs.length,
      page: Number(page),
      pageSize: Number(pageSize),
      postalCode: zip,
      searchedCategory: category || undefined,
    } as FindhelpSearchResponse);
  } catch (error) {
    console.error('Findhelp proxy error:', error);
    return res.status(500).json({
      error: 'proxy_error',
      message: 'Failed to fetch programs from Findhelp.',
    });
  }
}
