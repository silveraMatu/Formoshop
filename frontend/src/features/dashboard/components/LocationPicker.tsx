import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { useGoogleMaps } from "../hooks/useGoogleMaps";

// Centro por defecto: Formosa Capital
const FORMOSA_CENTER = { lat: -26.1852, lng: -58.1756 };
const FORMOSA_BOUNDS = {
  north: -22.0,
  south: -27.5,
  east: -57.5,
  west: -62.7,
};

export interface LocationValue {
  lat: number;
  lng: number;
  address?: string;
}

interface LocationPickerProps {
  value?: LocationValue | null;
  onChange: (value: LocationValue) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const { ready, error: mapsError } = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<any>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const [address, setAddress] = useState<string>(value?.address ?? "");

  // Inicializa mapa + marcador + autocomplete
  useEffect(() => {
    if (!ready || !mapRef.current || mapInstance.current) return;

    const initial = value ?? FORMOSA_CENTER;

    const initMap = async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      const { PlaceAutocompleteElement } = await google.maps.importLibrary("places") as any;

      const map = new Map(mapRef.current!, {
        center: initial,
        zoom: 13,
        restriction: {
          latLngBounds: FORMOSA_BOUNDS,
          strictBounds: false,
        },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapId: "DEMO_MAP_ID", // Necesario para AdvancedMarkerElement
      });

      const marker = new AdvancedMarkerElement({
        position: initial,
        map,
        gmpDraggable: true,
      });

      const geocoder = new google.maps.Geocoder();

      const syncFromLatLng = (latLng: google.maps.LatLng | google.maps.LatLngLiteral) => {
        const lat = typeof latLng.lat === 'function' ? latLng.lat() : latLng.lat;
        const lng = typeof latLng.lng === 'function' ? latLng.lng() : latLng.lng;
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          const formatted =
            status === "OK" && results?.[0]?.formatted_address
              ? results[0].formatted_address
              : "";
          setAddress(formatted);
          onChange({ lat, lng, address: formatted });
        });
      };

      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;
        marker.position = e.latLng;
        syncFromLatLng(e.latLng);
      });

      marker.addListener("dragend", () => {
        const pos = marker.position;
        if (pos) syncFromLatLng(pos as google.maps.LatLngLiteral);
      });

      const container = document.getElementById("location-autocomplete-container");
      if (container) {
        container.innerHTML = "";
        const autocomplete = new PlaceAutocompleteElement();
        autocomplete.componentRestrictions = { country: ["ar"] };
        autocomplete.locationRestriction = FORMOSA_BOUNDS;
        
        autocomplete.addEventListener("gmp-placeselect", async (e: any) => {
          const place = e.place;
          if (!place) return;
          await place.fetchFields({ fields: ["location", "formattedAddress"] });
          if (!place.location) return;
          const loc = place.location;
          map.setCenter(loc);
          map.setZoom(15);
          marker.position = loc;
          const formatted = place.formattedAddress ?? "";
          setAddress(formatted);
          onChange({ lat: loc.lat(), lng: loc.lng(), address: formatted });
        });

        autocomplete.classList.add("w-full");
        container.appendChild(autocomplete);
      }

      mapInstance.current = map;
      markerRef.current = marker;
      geocoderRef.current = geocoder;
    };

    initMap();
  }, [ready, value, onChange]);

  // Sincroniza cambios externos de value
  useEffect(() => {
    if (!value || !markerRef.current || !mapInstance.current) return;
    const pos = { lat: value.lat, lng: value.lng };
    markerRef.current.position = pos;
    mapInstance.current.panTo(pos);
    setAddress(value.address ?? "");
  }, [value]);

  return (
    <div className="glass-subtle rounded-2xl p-4 border border-white/40 dark:border-white/10 space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200">
        <MapPin size={16} className="text-blue-500" />
        Ubicación del producto (Formosa)
      </div>

      <div 
        id="location-autocomplete-container" 
        className="w-full bg-white/70 dark:bg-neutral-900/60 rounded-xl flex items-center justify-center overflow-hidden [&>*]:w-full"
      >
      </div>

      <div className="relative w-full h-64 rounded-xl overflow-hidden border border-white/40 dark:border-white/10">
        {!ready && !mapsError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm z-10">
            <Loader2 size={22} className="animate-spin text-blue-500" />
          </div>
        )}
        {mapsError && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-red-500 bg-white/70 dark:bg-neutral-900/70 z-10 px-4 text-center">
            {mapsError}
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {address
          ? `📍 ${address}`
          : "Hacé clic en el mapa o arrastrá el marcador para fijar el punto."}
      </p>
    </div>
  );
}
