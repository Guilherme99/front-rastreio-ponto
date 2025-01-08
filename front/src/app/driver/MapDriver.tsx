/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { socket } from "@/utils/socket-io";
import { useEffect, useRef } from "react";
import { useMap } from "../../hooks/useMap";

export type MapDriverProps = {
  routeIdElementId: string;
};

export function MapDriver(props: MapDriverProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef as any);

  const { routeIdElementId } = props;

  useEffect(() => {
    if (!map || !routeIdElementId) return;

    const selectElement = document.querySelector(
      `#${routeIdElementId}`
    )! as HTMLSelectElement;

    socket.connect();

    const handler = async (event: any) => {
      socket.offAny();

      const routeId = event.target!.value;
      console.log("routeId", routeId);

      socket.on(
        `server:new-points/${routeId}:list`,
        async (data: { route_id: string; lat: number; lng: number }) => {
          if (!map.hasRoute(data.route_id)) {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_NEXT_API_URL}/routes/${data.route_id}`
            );
            console.log("route", response);
            const route = await response.json();
            map.addRouteWithIcons({
              routeId: data.route_id,
              startMarkerOptions: {
                position: route.directions.routes[0].legs[0].start_location,
              },
              endMarkerOptions: {
                position: route.directions.routes[0].legs[0].end_location,
              },
              carMarkerOptions: {
                position: route.directions.routes[0].legs[0].start_location,
              },
            });
          }

          map.moveCar(data.route_id, {
            lat: data.lat,
            lng: data.lng,
          });
        }
      );
    };

    selectElement.addEventListener("change", handler);

    return () => {
      selectElement.removeEventListener("change", handler);
      socket.disconnect();
    };
  }, [routeIdElementId, map]);

  return <div className="flex-1 w-100 h-full" ref={mapContainerRef} />;
}
