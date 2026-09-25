import { useEffect, useState } from "react";

const SCRIPT_ID = "google-maps-script";

let loadPromise: Promise<void> | null = null;

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Error cargando Google Maps")));
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=es&region=AR`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Error cargando Google Maps"));
    document.head.appendChild(script);
  });

  return loadPromise;
}

export function useGoogleMaps() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const [ready, setReady] = useState<boolean>(() => Boolean(window.google?.maps));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey) {
      setError("Falta VITE_GOOGLE_MAPS_API_KEY en el entorno");
      return;
    }
    if (ready) return;

    loadGoogleMaps(apiKey)
      .then(() => setReady(true))
      .catch((err: Error) => setError(err.message));
  }, [apiKey, ready]);

  return { ready, error };
}
