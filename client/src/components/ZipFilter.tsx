/* ZipFilter.tsx — DiscountHub
 * Reusable zip code input component with state lookup
 * Design: Warm Abundance — terracotta/cream/forest green
 */
import { useState, useCallback, useRef } from "react";
import { MapPin, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { lookupZip, getStateFromZipSync, getStateNameFromAbbr, type ZipInfo } from "@/lib/zipLookup";

export interface ZipFilterState {
  zip: string;
  stateCode: string | null;
  stateName: string | null;
  city: string | null;
  active: boolean;
}

interface ZipFilterProps {
  value: ZipFilterState;
  onChange: (state: ZipFilterState) => void;
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

const EMPTY_STATE: ZipFilterState = {
  zip: "",
  stateCode: null,
  stateName: null,
  city: null,
  active: false,
};

export function useZipFilter() {
  const [zipFilter, setZipFilter] = useState<ZipFilterState>(EMPTY_STATE);
  const clearZip = useCallback(() => setZipFilter(EMPTY_STATE), []);
  return { zipFilter, setZipFilter, clearZip };
}

type LookupStatus = "idle" | "loading" | "found" | "error";

export default function ZipFilter({ value, onChange, placeholder = "Enter ZIP code", className = "", compact = false }: ZipFilterProps) {
  const [inputVal, setInputVal] = useState(value.zip || "");
  const [status, setStatus] = useState<LookupStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInput = (raw: string) => {
    const cleaned = raw.replace(/\D/g, "").slice(0, 5);
    setInputVal(cleaned);
    setErrorMsg("");

    if (cleaned.length === 0) {
      setStatus("idle");
      onChange(EMPTY_STATE);
      return;
    }

    // Instant sync estimate from prefix (3 digits)
    if (cleaned.length >= 3) {
      const syncState = getStateFromZipSync(cleaned);
      if (syncState) {
        onChange({
          zip: cleaned,
          stateCode: syncState,
          stateName: getStateNameFromAbbr(syncState),
          city: null,
          active: cleaned.length === 5,
        });
      }
    }

    if (cleaned.length < 5) {
      setStatus("idle");
      return;
    }

    // Debounce API lookup
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setStatus("loading");
    debounceRef.current = setTimeout(async () => {
      try {
        const info: ZipInfo | null = await lookupZip(cleaned);
        if (info) {
          setStatus("found");
          onChange({
            zip: info.zip,
            stateCode: info.state,
            stateName: info.stateName,
            city: info.city,
            active: true,
          });
        } else {
          setStatus("error");
          setErrorMsg("ZIP code not found. Please check and try again.");
          // Keep sync estimate active
        }
      } catch {
        setStatus("error");
        setErrorMsg("Could not look up ZIP code. Using state estimate.");
      }
    }, 600);
  };

  const handleClear = () => {
    setInputVal("");
    setStatus("idle");
    setErrorMsg("");
    onChange(EMPTY_STATE);
  };

  const isActive = value.active && value.stateCode;

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="relative">
          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            inputMode="numeric"
            value={inputVal}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={placeholder}
            maxLength={5}
            className="pl-8 pr-7 py-1.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.13_42)] w-36 transition-all"
          />
          {inputVal && (
            <button onClick={handleClear} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        {status === "loading" && <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />}
        {isActive && status !== "loading" && (
          <span className="text-xs font-medium text-[oklch(0.40_0.10_140)] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {value.city ? `${value.city}, ${value.stateCode}` : value.stateName}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          inputMode="numeric"
          value={inputVal}
          onChange={(e) => handleInput(e.target.value)}
          placeholder={placeholder}
          maxLength={5}
          className="w-full pl-10 pr-10 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.13_42)] transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {status === "loading" && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
          {status === "found" && <CheckCircle2 className="w-4 h-4 text-[oklch(0.40_0.10_140)]" />}
          {status === "error" && <AlertCircle className="w-4 h-4 text-amber-500" />}
          {inputVal && status === "idle" && (
            <button onClick={handleClear} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Status messages */}
      {isActive && status !== "loading" && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[oklch(0.93_0.04_140)] border border-[oklch(0.82_0.06_140)]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[oklch(0.40_0.10_140)] shrink-0" />
          <span className="text-xs text-[oklch(0.35_0.10_140)] font-medium">
            Showing programs for{" "}
            <strong>{value.city ? `${value.city}, ` : ""}{value.stateName}</strong>
            {" "}— federal programs + {value.stateCode}-specific programs
          </span>
          <button onClick={handleClear} className="ml-auto text-[oklch(0.45_0.10_140)] hover:text-[oklch(0.30_0.10_140)]">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      {errorMsg && (
        <p className="text-xs text-amber-600 flex items-center gap-1.5 px-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {errorMsg}
        </p>
      )}
    </div>
  );
}
