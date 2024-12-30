/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { useMap } from "../../hooks/useMap";
import { DirectionsData } from "../../utils/models";

export type MapDriverProps = {
  directionsData: DirectionsData;
};

export function MapDriver() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useMap(mapContainerRef as any);

  return <div className="flex-1 w-100 h-full" ref={mapContainerRef} />;
}
