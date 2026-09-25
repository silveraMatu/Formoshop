import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L, { type LatLngExpression, type LeafletMouseEvent } from "leaflet";
import { MapPin, Loader2, Search } from "lucide-react";

// Centro por defecto: Formosa Capital, Argentina
const FORMOSA_CENTER: LatLngExpression = [-26.1852, -58.1756];
const FORMOSA_ZOOM = 13;

// Viewbox aproximado de la provincia de Formosa (para Nominatim)
const FORMOSA_VIEWBOX = "-62.5,-22.0,-57.5,-27.0";

export interface LocationValue {
  lat: number;
  lng: number;
  address?: string;
}

interface LocationPickerMapProps {
  value?: LocationValue | null;
  onChange: (value: LocationValue) => void;
  className?: string;
}

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

// Icono minimalista (evita el bug clásico de los assets de Leaflet con Vite)
const markerIcon = L.divIcon({
  className: "formoshop-marker",
  html: `
    <span style="
      display:flex;align-items:center;justify-content:center;
      width:32px;height:32px;border-radius:9999px;
      background:#08a8e8;color:#fff;
      box-shadow:0 4px 12px rgba(8,168,232,0.45);
      border:2px solid #fff;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </span>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

/** Captura clicks sobre el mapa y notifica la nueva posición. */
function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(event: LeafletMouseEvent) {
      onPick(event.latlng.lat, event.latlng.lng);
    },
  });
  return null;
}

/** Sincroniza el centro del mapa cuando cambia la posición externa. */
function MapController({ position }: { position: LatLngExpression | null }) {
  const map = useMap();
  useEffect(() => {
    if (!position) return;
    map.flyTo(position, Math.max(map.getZoom(), FORMOSA_ZOOM), { duration: 0.6 });
  }, [map, position]);
  return null;
}

/** Fuerza un re-render del mapa cuando cambia el tamaño del contenedor (modales). */
function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const timeout = window.setTimeout(() => map.invalidateSize(), 200);
    return () => window.clearTimeout(timeout);
  }, [map]);
  return null;
}

export function LocationPickerMap({ value, onChange, className }: LocationPickerMapProps) {
  const [address, setAddress] = useState<string>(value?.address ?? "");
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [flyTarget, setFlyTarget] = useState<LatLngExpression | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const position = useMemo<LatLngExpression | null>(
    () => (value ? [value.lat, value.lng] : null),
    [value?.lat, value?.lng],
  );

  // Reverse geocoding con Nominatim para obtener la dirección del punto elegido
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) return "";
      const data = (await res.json()) as { display_name?: string };
      return data.display_name ?? "";
    } catch {
      return "";
    }
  };

  const handlePick = async (lat: number, lng: number) => {
    setAddress("Buscando dirección...");
    const formatted = await reverseGeocode(lat, lng);
    setAddress(formatted);
    onChange({ lat, lng, ...(formatted ? { address: formatted } : {}) });
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setSearching(true);
    setSearchError(null);
    setResults([]);

    try {
      const url =
        `https://nominatim.openstreetmap.org/search?format=json` +
        `&q=${encodeURIComponent(trimmed)}` +
        `&countrycodes=ar` +
        `&viewbox=${FORMOSA_VIEWBOX}` +
        `&bounded=1` +
        `&limit=5`;

      const res = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("No se pudo consultar el buscador");

      const data = (await res.json()) as NominatimResult[];
      if (!data.length) {
        setSearchError("No encontramos esa dirección en Formosa.");
        return;
      }

      setResults(data);
      const first = data[0];
      const lat = Number(first.lat);
      const lng = Number(first.lon);
      setFlyTarget([lat, lng]);
      setAddress(first.display_name);
      onChange({ lat, lng, address: first.display_name });
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setSearchError((err as Error).message);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectResult = (result: NominatimResult) => {
    const lat = Number(result.lat);
    const lng = Number(result.lon);
    setFlyTarget([lat, lng]);
    setAddress(result.display_name);
    onChange({ lat, lng, address: result.display_name });
    setResults([]);
  };

  return (
    <div
      className={
        "glass-subtle rounded-2xl p-4 border border-white/40 dark:border-white/10 space-y-3 " +
        (className ?? "")
      }
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200">
        <MapPin size={16} className="text-blue-500" />
        Ubicación del producto (Formosa)
      </div>

      {/* Buscador Nominatim */}
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar dirección o localidad en Formosa..."
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-white/70 dark:bg-neutral-900/60 border border-black/5 dark:border-white/10 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-500 outline-none focus:border-black/20 dark:focus:border-white/20 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={searching}
          className="px-4 py-2.5 text-sm font-medium rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 transition-colors active:scale-[0.98]"
        >
          {searching ? <Loader2 size={16} className="animate-spin" /> : "Buscar"}
        </button>
      </form>

      {searchError && (
        <p className="text-xs text-red-500">{searchError}</p>
      )}

      {results.length > 1 && (
        <ul className="max-h-40 overflow-y-auto rounded-xl border border-black/5 dark:border-white/10 divide-y divide-black/5 dark:divide-white/10">
          {results.map((result, index) => (
            <li key={`${result.lat}-${result.lon}-${index}`}>
              <button
                type="button"
                onClick={() => handleSelectResult(result)}
                className="w-full text-left px-3 py-2 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                {result.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Mapa */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden border border-white/40 dark:border-white/10">
        <MapContainer
          center={position ?? FORMOSA_CENTER}
          zoom={FORMOSA_ZOOM}
          scrollWheelZoom
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onPick={handlePick} />
          <MapController position={flyTarget ?? position} />
          <ResizeHandler />
          {position && <Marker position={position} icon={markerIcon} />}
        </MapContainer>
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {address
          ? `📍 ${address}`
          : "Hacé clic en el mapa o buscá una dirección para fijar el punto."}
      </p>
    </div>
  );
}
