/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMap } from "@/hooks/useMap";
import { useRef } from "react";

export function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useMap(mapContainerRef as any);

  return <div className="flex-1 w-screen h-screen" ref={mapContainerRef} />;
}

export default AdminPage;
