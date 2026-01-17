import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, Pane, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function RainMap() {
  const [frames, setFrames] = useState([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [error, setError] = useState(false);

  // Fetch radar frames
  const fetchRadar = async () => {
    try {
      const res = await axios.get(
        "https://api.rainviewer.com/public/weather-maps.json"
      );
      const pastFrames = res.data?.radar?.past || [];
      setFrames(pastFrames);
      setError(false);
    } catch (err) {
      console.error("RainViewer API error:", err);
      setError(true);
    }
  };

  // Initial load + auto refresh (5 min)
  useEffect(() => {
    fetchRadar();
    const refresh = setInterval(fetchRadar, 300000); // 5 min
    return () => clearInterval(refresh);
  }, []);

  // Radar animation
  useEffect(() => {
    if (!playing || frames.length === 0) return;

    const interval = setInterval(() => {
      setIndex(i => (i + 1) % frames.length);
    }, 600);

    return () => clearInterval(interval);
  }, [playing, frames]);

  return (
    <div style={{ height: "92%", width: "97%", margin: "5px", position: "relative" }}>
      {/* Controls */}
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          top: 10,
          left: 10,
          background: "white",
          padding: "8px 12px",
          borderRadius: "6px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        <button onClick={() => setPlaying(p => !p)}>
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          bottom: 20,
          left: 10,
          background: "white",
          padding: "8px",
          borderRadius: "6px",
          fontSize: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        <b>Rain Intensity</b>
        <div style={{ color: "#00f" }}>Light</div>
        <div style={{ color: "#0f0" }}>Moderate</div>
        <div style={{ color: "#ff0" }}>Heavy</div>
        <div style={{ color: "#f00" }}>Very Heavy</div>
      </div>

      <MapContainer
        center={[20.9, 74.8]} 
        zoom={7}
        style={{
          height: "100%",
          width: "100%",
          border: "2px solid black",
        }}
      >
        {/* Base Map */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Radar Pane */}
        <Pane name="radar" style={{ zIndex: 650 }}>
          {frames.length > 0 && (
            <TileLayer
              key={frames[index]?.time}
              pane="radar"
              opacity={0.9}
              url={`https://tilecache.rainviewer.com/v2/radar/${frames[index].time}/256/{z}/{x}/{y}/1/1_1.png`}
            />
          )}
        </Pane>

      </MapContainer>

      {/* Error message */}
      {error && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "12px",
            borderRadius: "6px",
            zIndex: 2000,
          }}
        >
          ❌ Unable to load rain radar
        </div>
      )}
    </div>
  );
}
