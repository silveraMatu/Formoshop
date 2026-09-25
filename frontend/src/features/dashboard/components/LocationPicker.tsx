import { LocationPickerMap, type LocationValue } from "@/shared/components/LocationPickerMap";

export type { LocationValue };

interface LocationPickerProps {
  value?: LocationValue | null;
  onChange: (value: LocationValue) => void;
}

/**
 * @deprecated Usar `LocationPickerMap` de `@/shared/components/LocationPickerMap`.
 * Se mantiene como wrapper para no romper imports existentes.
 */
export function LocationPicker({ value, onChange }: LocationPickerProps) {
  return <LocationPickerMap value={value} onChange={onChange} />;
}
