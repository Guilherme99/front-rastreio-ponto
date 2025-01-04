/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { socket } from "@/utils/socket-io";
import { useEffect, useRef } from "react";
import { useMap } from "../../hooks/useMap";

export type MapDriverProps = {
  route_id: string | null;
  start_location: {
    lat: number;
    lng: number;
  } | null;
  end_location: {
    lat: number;
    lng: number;
  } | null;
};

export function MapDriver(props: MapDriverProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef as any);

  const { route_id, start_location, end_location } = props;
  useEffect(() => {
    if (!map || !route_id || !start_location || !end_location) return;

    if (socket.disconnected) {
      socket.connect();
    }
    //  else {
    //   socket.offAny();
    // }

    socket.on("connect", () => {
      console.log("conectado");
      socket.emit("client:new-points", { route_id });
    });

    socket.on(
      `server:new-points/${route_id}:list`,
      (data: { route_id: string; lat: number; lng: number }) => {
        if (!map.hasRoute(data.route_id)) {
          console.log("data", data);
          map.addRouteWithIcons({
            routeId: data.route_id,
            startMarkerOptions: {
              position: start_location,
            },
            endMarkerOptions: {
              position: end_location,
            },
            carMarkerOptions: {
              position: start_location,
            },
          });
        } else {
          map.moveCar(data.route_id, {
            lat: data.lat,
            lng: data.lng,
          });
        }
      }
    );

    // return () => {
    //   socket.disconnect();
    // };
  }, [route_id, map, start_location, end_location]);

  return <div className="flex-1 w-100 h-full" ref={mapContainerRef} />;
}
