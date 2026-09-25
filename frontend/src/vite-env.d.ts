/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace google.maps {
  class Map {
    constructor(el: HTMLElement, opts?: Record<string, unknown>);
    addListener(event: string, handler: (e: MapMouseEvent) => void): void;
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    panTo(latLng: LatLng | LatLngLiteral): void;
  }
  class Marker {
    constructor(opts?: Record<string, unknown>);
    setPosition(latLng: LatLng | LatLngLiteral): void;
    getPosition(): LatLng | null;
    addListener(event: string, handler: () => void): void;
  }
  class Geocoder {
    geocode(
      req: { location: LatLngLiteral },
      cb: (results: GeocoderResult[] | null, status: string) => void,
    ): void;
  }
  class LatLng {
    lat(): number;
    lng(): number;
  }
  interface LatLngLiteral {
    lat: number;
    lng: number;
  }
  interface MapMouseEvent {
    latLng: LatLng | null;
  }
  interface GeocoderResult {
    formatted_address?: string;
  }
  namespace places {
    class Autocomplete {
      constructor(input: HTMLInputElement, opts?: Record<string, unknown>);
      addListener(event: string, handler: () => void): void;
      getPlace(): {
        geometry?: { location?: LatLng };
        formatted_address?: string;
      };
    }
  }
  const Animation: { DROP: number };
}

interface Window {
  google?: typeof google;
}
