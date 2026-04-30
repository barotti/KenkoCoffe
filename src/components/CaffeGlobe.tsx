"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";

// WebGL requires browser — no SSR
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface Origin {
  id: string;
  name: string;
  region: string;
  coord: string;
  lat: number;
  lng: number;
  text: string;
  image: string;
}

interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

const ORIGINS: Origin[] = [
  {
    id: "colombia", name: "Colombia", region: "Andes Centrali",
    coord: "04°34′ N · 74°17′ W", lat: 4.5709, lng: -74.2973,
    text: "Coltivazioni d'altura sulle pendici della Cordigliera. Climi miti e suoli vulcanici donano un caffè equilibrato, dolce, con la rotondità classica dell'arabica colombiana.",
    image: "/images/caffe/origins/colombia.jpg",
  },
  {
    id: "brasile", name: "Brasile", region: "Cerrado Mineiro",
    coord: "14°14′ S · 51°55′ W", lat: -14.2350, lng: -51.9253,
    text: "Patria del caffè più consumato al mondo. Le piantagioni del Minas Gerais regalano corpo, dolcezza naturale e quella firma di cacao e nocciola che tiene insieme i nostri blend.",
    image: "/images/caffe/origins/brasile.jpg",
  },
  {
    id: "nicaragua", name: "Nicaragua", region: "Jinotega",
    coord: "12°51′ N · 85°12′ W", lat: 12.8654, lng: -85.2072,
    text: "Le montagne di Jinotega, ombreggiate dalla foresta tropicale, producono caffè con corpo pieno e una vibrante acidità. È qui che nasce la spinta fruttata del nostro 80/20.",
    image: "/images/caffe/origins/nicaragua.jpg",
  },
  {
    id: "india", name: "India", region: "Karnataka",
    coord: "12°58′ N · 77°35′ E", lat: 12.9716, lng: 77.5946,
    text: "Sui Western Ghats si coltiva una robusta dal carattere unico, meno amara, con sentori speziati. Porta al blend struttura e quella crema densa che firma l'espresso.",
    image: "/images/caffe/origins/india.jpg",
  },
  {
    id: "sidamo", name: "Sidamo", region: "Etiopia",
    coord: "06°44′ N · 38°29′ E", lat: 6.7333, lng: 38.4833,
    text: "La culla del caffè. Negli altopiani del sud etiope, l'arabica cresce come pianta spontanea da secoli. Aroma floreale, agrumato, complesso — il cuore raffinato del Blend 100%.",
    image: "/images/caffe/origins/sidamo.jpg",
  },
];

// Arcs connecting blend origins
const ARCS: Arc[] = [
  // Blend 80/20: Colombia → Brasile → Nicaragua → India → Colombia
  { startLat: 4.5709,  startLng: -74.2973, endLat: -14.2350, endLng: -51.9253, color: "#00704a" },
  { startLat: -14.2350, startLng: -51.9253, endLat: 12.8654,  endLng: -85.2072, color: "#00704a" },
  { startLat: 12.8654,  startLng: -85.2072, endLat: 12.9716,  endLng:  77.5946, color: "#00704a" },
  { startLat: 12.9716,  startLng:  77.5946, endLat: 4.5709,   endLng: -74.2973, color: "#00704a" },
  // Blend 100%: Colombia → Brasile → Sidamo → Colombia
  { startLat: 4.5709,  startLng: -74.2973, endLat: -14.2350, endLng: -51.9253, color: "#00a862" },
  { startLat: -14.2350, startLng: -51.9253, endLat: 6.7333,   endLng:  38.4833, color: "#00a862" },
  { startLat: 6.7333,   startLng:  38.4833, endLat: 4.5709,   endLng: -74.2973, color: "#00a862" },
];

export function CaffeGlobe() {
  const globeRef  = useRef<GlobeMethods | undefined>(undefined);
  const stageRef  = useRef<HTMLDivElement>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<Origin | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  // Track container size
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => {
      setDims({ w: stage.clientWidth, h: stage.clientHeight });
    });
    ro.observe(stage);
    setDims({ w: stage.clientWidth, h: stage.clientHeight });
    return () => ro.disconnect();
  }, []);

  // Configure controls after globe is ready
  const onGlobeReady = useCallback(() => {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls() as {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
      enableDamping: boolean;
      dampingFactor: number;
    };
    controls.autoRotate    = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableZoom    = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    // Center view on Atlantic to show most origins at once
    g.pointOfView({ lat: 8, lng: -25, altitude: 2.2 }, 0);
  }, []);

  return (
    <div className="cg-stage" ref={stageRef}>
      {dims.w > 0 && (
        <Globe
          ref={globeRef}
          width={dims.w}
          height={dims.h}
          onGlobeReady={onGlobeReady}

          /* Globe appearance */
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="#4db8ff"
          atmosphereAltitude={0.18}
          showGraticules={true}

          /* Origin markers */
          pointsData={ORIGINS}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => "#d4e9e2"}
          pointRadius={0.45}
          pointAltitude={0.01}
          onPointClick={(point) => setSelectedOrigin(point as Origin)}
          onPointHover={(point) => {
            if (stageRef.current)
              stageRef.current.style.cursor = point ? "pointer" : "default";
          }}

          /* Pulsing rings on each marker */
          ringsData={ORIGINS}
          ringLat="lat"
          ringLng="lng"
          ringColor={() => (t: number) => `rgba(0,168,98,${(1 - t) * 0.7})`}
          ringMaxRadius={3.5}
          ringPropagationSpeed={2.5}
          ringRepeatPeriod={1800}
          ringAltitude={0.005}

          /* Blend connection arcs */
          arcsData={ARCS}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={(arc: object) => (arc as Arc).color}
          arcAltitude={0.38}
          arcStroke={0.45}
          arcDashLength={0.5}
          arcDashGap={0.25}
          arcDashAnimateTime={3000}

          /* Labels */
          labelsData={ORIGINS}
          labelLat="lat"
          labelLng="lng"
          labelText="name"
          labelColor={() => "rgba(242,240,235,0.92)"}
          labelSize={1.0}
          labelDotRadius={0}
          labelAltitude={0.025}
          labelResolution={2}
        />
      )}

      <div className="cg-corner cg-corner--tl">
        Mappa origini<br /><span>—</span> trascina · clicca per scoprire
      </div>
      <div className="cg-corner cg-corner--tr">
        Lat / Long<br /><span>04°34′ N · 74°17′ W</span>
      </div>
      <div className="cg-meta">Rotazione automatica · 5 punti</div>

      {selectedOrigin && (
        <div className="cg-modal-backdrop" onClick={() => setSelectedOrigin(null)}>
          <div className="cg-modal" onClick={e => e.stopPropagation()}>
            <button className="cg-modal__close" onClick={() => setSelectedOrigin(null)}>×</button>
            <div className="cg-modal__img-wrap">
              <Image
                src={selectedOrigin.image}
                alt={selectedOrigin.name}
                fill
                className="cg-modal__img"
                sizes="460px"
              />
              <div className="cg-modal__img-fade" />
            </div>
            <div className="cg-modal__body">
              <div className="cg-modal__region">{selectedOrigin.region}</div>
              <h3 className="cg-modal__name">{selectedOrigin.name}</h3>
              <p className="cg-modal__text">{selectedOrigin.text}</p>
              <div className="cg-modal__coords">{selectedOrigin.coord}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
