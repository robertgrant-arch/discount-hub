/**
 * FindhelpResults.tsx — DiscountHub
 * Displays local community programs from the Findhelp network.
 * Integrates into the State & Local Programs tab alongside static programs.
 * Design: Warm Abundance — terracotta/cream/forest green
 */
import { useState } from 'react';
import {
  MapPin, ExternalLink, Phone, ChevronDown, ChevronUp, Clock,
  ShieldCheck, Building2, Loader2, AlertTriangle, Search,
} from 'lucide-react';
import type { FindhelpProgram } from '@/hooks/useFindhelp';

// ── Findhelp Program Card ─────────────────────────────────────────

function FindhelpProgramCard({ program }: { program: FindhelpProgram }) {
  const [expanded, setExpanded] = useState(false);

  const addressLine = program.address
    ? [program.address.city, program.address.state].filter(Boolean).join(', ')
    : null;

  return (
    <div className="bg-white rounded-xl border border-[oklch(0.88_0.02_75)] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <button
        className="w-full text-left p-4 flex items-start gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Findhelp badge */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
          style={{ background: 'oklch(0.92 0.04 175)', color: 'oklch(0.35 0.08 175)' }}
        >
          <Search className="w-3.5 h-3.5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-[oklch(0.25_0.02_60)] text-sm leading-tight">
              {program.name}
            </h3>
            {program.isClaimed && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-green-50 text-green-700">
                <ShieldCheck className="w-3 h-3" /> Verified
              </span>
            )}
          </div>

          {/* Tags row */}
          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'oklch(0.92 0.04 175)', color: 'oklch(0.35 0.08 175)' }}>
              Findhelp Network
            </span>
            {program.categories.slice(0, 3).map((cat) => (
              <span key={cat} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[oklch(0.94_0.02_75)] text-[oklch(0.4_0.06_60)]">
                {cat}
              </span>
            ))}
            {program.distance !== undefined && (
              <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                <MapPin className="w-3 h-3" />
                {program.distance.toFixed(1)} mi
              </span>
            )}
          </div>

          {/* Organization + address */}
          <p className="text-xs text-gray-500">
            {program.organization.name}
            {addressLine && ` \u2022 ${addressLine}`}
          </p>

          {/* Description preview */}
          {program.description && !expanded && (
            <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">{program.description}</p>
          )}
        </div>

        <span className="text-gray-400 mt-1">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-[oklch(0.94_0.01_75)]">
          {program.description && (
            <p className="text-sm text-gray-700 mt-3 leading-relaxed">{program.description}</p>
          )}

          {program.eligibility && (
            <div className="mt-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Eligibility</h4>
              <p className="text-sm text-gray-700">{program.eligibility}</p>
            </div>
          )}

          {program.applicationProcess && (
            <div className="mt-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">How to Apply</h4>
              <p className="text-sm text-gray-700">{program.applicationProcess}</p>
            </div>
          )}

          {program.hours && (
            <div className="mt-3 flex items-start gap-2">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-700">{program.hours}</p>
            </div>
          )}

          {program.address?.street1 && (
            <div className="mt-3 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-700">
                {program.address.street1}
                {program.address.street2 && `, ${program.address.street2}`}
                {program.address.city && `, ${program.address.city}`}
                {program.address.state && `, ${program.address.state}`}
                {program.address.zip && ` ${program.address.zip}`}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {(program.phone || program.organization.phone) && (
              <a
                href={`tel:${program.phone || program.organization.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[oklch(0.92_0.04_40)] text-[oklch(0.4_0.12_40)] hover:bg-[oklch(0.88_0.06_40)] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {program.phone || program.organization.phone}
              </a>
            )}
            {(program.website || program.organization.website) && (
              <a
                href={program.website || program.organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[oklch(0.92_0.04_175)] text-[oklch(0.35_0.08_175)] hover:bg-[oklch(0.88_0.06_175)] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Visit Website
              </a>
            )}
          </div>

          {program.lastUpdated && (
            <p className="text-[10px] text-gray-400 mt-3">
              Last updated: {new Date(program.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Section Component ───────────────────────────────────────

interface FindhelpResultsProps {
  programs: FindhelpProgram[];
  totalResults: number;
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  zipCode: string;
}

export default function FindhelpResults({
  programs,
  totalResults,
  loading,
  error,
  isConfigured,
  hasMore,
  onLoadMore,
  zipCode,
}: FindhelpResultsProps) {
  // Don't render if API is not configured (no key yet)
  if (!isConfigured) return null;

  return (
    <div className="mt-6">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'oklch(0.92 0.04 175)', color: 'oklch(0.35 0.08 175)' }}
        >
          <Building2 className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-semibold text-[oklch(0.25_0.02_60)] text-base">
            Local Community Resources
          </h3>
          <p className="text-xs text-gray-500">
            {totalResults > 0
              ? `${totalResults} programs near ${zipCode} via Findhelp network`
              : loading
              ? 'Searching local programs...'
              : 'Search for local programs by entering your ZIP code'}
          </p>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm mb-4">
          <AlertTriangle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && programs.length === 0 && (
        <div className="flex items-center justify-center py-8 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Searching Findhelp network...
        </div>
      )}

      {/* Program cards */}
      {programs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {programs.map((program) => (
            <FindhelpProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}

      {/* Load more button */}
      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-[oklch(0.85_0.03_175)] text-[oklch(0.35_0.08_175)] hover:bg-[oklch(0.96_0.02_175)] disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
            ) : (
              <>Show more local programs</>
            )}
          </button>
        </div>
      )}

      {/* Attribution */}
      {programs.length > 0 && (
        <p className="text-[10px] text-gray-400 mt-3 text-center">
          Local program data provided by{' '}
          <a
            href="https://www.findhelp.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            Findhelp.org
          </a>
          {' '}• 970,000+ program locations nationwide
        </p>
      )}
    </div>
  );
}
