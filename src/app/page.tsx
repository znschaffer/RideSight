"use client";
import Map from "react-map-gl/maplibre";
import MapContainer from "@/components/MapContainer";
import AuthFlow from "@/components/AuthFlow"

export default function Home() {
  return (
    <div style={{ height: "100dvh", display: "flex" }}>
      <nav>
        <h1>RideSight</h1>
      </nav>
      <AuthFlow />
    </div>
  );
}
