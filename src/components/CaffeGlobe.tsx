"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";

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

const RADIUS   = 1.32;
const TEX_BASE = "https://raw.githubusercontent.com/mrdoob/three.js/r128/examples/textures/";

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * Math.PI / 180;
  const theta = (lng + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

function quadraticBezierPoints(
  p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3, segments = 90,
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments, u = 1 - t;
    pts.push(new THREE.Vector3(
      u*u*p0.x + 2*u*t*p1.x + t*t*p2.x,
      u*u*p0.y + 2*u*t*p1.y + t*t*p2.y,
      u*u*p0.z + 2*u*t*p1.z + t*t*p2.z,
    ));
  }
  return pts;
}

interface MarkerData { origin: Origin; dot: THREE.Mesh; halo: THREE.Mesh; ring: THREE.Mesh; }

export function CaffeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef  = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [selectedOrigin, setSelectedOrigin] = useState<Origin | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage  = stageRef.current;
    if (!canvas || !stage) return;

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.1, 5.2);

    function resize() {
      const w = stage!.clientWidth, h = stage!.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    // ── Lighting ──────────────────────────────────────────────────────
    const sun = new THREE.DirectionalLight(0xfff5e8, 1.8);
    sun.position.set(5, 3, 5);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x223344, 0.3);
    fill.position.set(-4, -2, -3);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0x111a11, 0.6));

    // ── Earth ─────────────────────────────────────────────────────────
    const earth = new THREE.Group();
    scene.add(earth);

    const loader   = new THREE.TextureLoader();
    const earthMap = loader.load(TEX_BASE + "planets/earth_atmos_2048.jpg");
    const specMap  = loader.load(TEX_BASE + "planets/earth_specular_2048.jpg");
    const bumpMap  = loader.load(TEX_BASE + "planets/earth_normal_2048.jpg");
    const cloudMap = loader.load(TEX_BASE + "planets/earth_clouds_1024.png");
    earthMap.anisotropy = 4;

    earth.add(new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, 96, 96),
      new THREE.MeshPhongMaterial({
        map: earthMap, specularMap: specMap,
        specular: new THREE.Color(0x4488aa), shininess: 18,
        bumpMap, bumpScale: 0.05,
      }),
    ));

    const cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.010, 72, 72),
      new THREE.MeshPhongMaterial({ map: cloudMap, transparent: true, opacity: 0.5, depthWrite: false }),
    );
    scene.add(cloudMesh);

    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.16, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }`,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float rim = 1.0 - abs(dot(vNormal, vec3(0.0,0.0,1.0)));
            float i   = pow(rim, 3.0);
            vec3  col = mix(vec3(0.0,0.42,0.28), vec3(0.2,0.75,0.55), rim);
            gl_FragColor = vec4(col, i * 0.75);
          }`,
        blending: THREE.AdditiveBlending, side: THREE.BackSide,
        transparent: true, depthWrite: false,
      }),
    );
    scene.add(atmo);

    // ── Markers ───────────────────────────────────────────────────────
    const markers: MarkerData[] = [];
    const originPos: Record<string, THREE.Vector3> = {};

    ORIGINS.forEach(o => {
      const pos = latLngToVec3(o.lat, o.lng, RADIUS * 1.016);
      originPos[o.id] = pos;

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.024, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xeefff4 }),
      );
      dot.position.copy(pos);
      earth.add(dot);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.062, 18, 18),
        new THREE.MeshBasicMaterial({ color: 0x00A862, transparent: true, opacity: 0.4, depthWrite: false }),
      );
      halo.position.copy(pos);
      earth.add(halo);

      const ring = new THREE.Mesh(
        new THREE.SphereGeometry(0.11, 18, 18),
        new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.15, depthWrite: false }),
      );
      ring.position.copy(pos);
      earth.add(ring);

      const beamLen = 0.20;
      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.0045, 0.001, beamLen, 8),
        new THREE.MeshBasicMaterial({ color: 0x80ffc0, transparent: true, opacity: 0.65, depthWrite: false }),
      );
      beam.position.copy(pos.clone().normalize().multiplyScalar(RADIUS * 1.016 + beamLen / 2));
      beam.lookAt(new THREE.Vector3(0, 0, 0));
      beam.rotateX(Math.PI / 2);
      earth.add(beam);

      markers.push({ origin: o, dot, halo, ring });
    });

    // ── Arcs ──────────────────────────────────────────────────────────
    function addArc(a: string, b: string, color: number, opacity: number, height = 0.30) {
      const p1 = originPos[a], p2 = originPos[b];
      const mid = p1.clone().add(p2).multiplyScalar(0.5)
        .normalize().multiplyScalar(RADIUS * (1 + p1.distanceTo(p2) * height));
      earth.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(quadraticBezierPoints(p1, mid, p2)),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }),
      ));
    }

    const b8020 = ["colombia", "brasile", "nicaragua", "india"];
    for (let i = 0; i < b8020.length; i++)
      addArc(b8020[i], b8020[(i + 1) % b8020.length], 0x00ff88, 0.50, 0.28);

    const b100 = ["colombia", "brasile", "sidamo"];
    for (let i = 0; i < b100.length; i++)
      addArc(b100[i], b100[(i + 1) % b100.length], 0xaaffdd, 0.38, 0.44);

    // ── Controls ──────────────────────────────────────────────────────
    let isDragging = false, hasMoved = false;
    let prev = { x: 0, y: 0 };
    const rot    = { x: 0.18, y: 1.0 };
    const target = { x: 0.18, y: 1.0 };
    const raycaster = new THREE.Raycaster();
    const hitMeshes = () => markers.flatMap(m => [m.dot, m.halo]);

    const onDown = (e: PointerEvent) => {
      isDragging = true; hasMoved = false;
      prev = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasMoved = true;
      target.y += dx * 0.005;
      target.x  = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, target.x + dy * 0.005));
      prev = { x: e.clientX, y: e.clientY };
    };
    const onUp = (e: PointerEvent) => {
      if (!hasMoved) {
        const rect = canvas.getBoundingClientRect();
        raycaster.setFromCamera(
          new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1,
          ),
          camera,
        );
        const hit = raycaster.intersectObjects(hitMeshes())[0];
        if (hit) {
          const m = markers.find(m => m.dot === hit.object || m.halo === hit.object);
          if (m) setSelectedOrigin(m.origin);
        }
      }
      isDragging = false;
    };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      raycaster.setFromCamera(
        new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1,
        ),
        camera,
      );
      canvas.style.cursor = raycaster.intersectObjects(hitMeshes()).length ? "pointer" : "grab";
    };

    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    canvas.addEventListener("mousemove", onMouseMove);

    // ── Animation ─────────────────────────────────────────────────────
    const camDir = camera.position.clone().normalize();
    const wp = new THREE.Vector3();
    let t = 0, rafId = 0;

    function animate() {
      rafId = requestAnimationFrame(animate);
      t += 0.01;

      if (!isDragging) target.y += 0.0008;
      rot.x += (target.x - rot.x) * 0.08;
      rot.y += (target.y - rot.y) * 0.08;

      earth.rotation.x     = rot.x;
      earth.rotation.y     = rot.y;
      cloudMesh.rotation.x = rot.x;
      cloudMesh.rotation.y = rot.y + t * 0.0025;
      atmo.rotation.x      = rot.x;
      atmo.rotation.y      = rot.y;

      markers.forEach((m, i) => {
        const s1 = 1 + Math.sin(t * 1.6 + i * 1.3) * 0.2;
        m.halo.scale.setScalar(s1);
        (m.halo.material as THREE.MeshBasicMaterial).opacity = 0.28 + Math.sin(t * 1.6 + i * 1.3) * 0.14;
        const s2 = 1 + (Math.sin(t * 1.1 + i * 0.7) * 0.5 + 0.5) * 0.65;
        m.ring.scale.setScalar(s2);
        (m.ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.18 - (s2 - 1) * 0.22);
      });

      const w = stage!.clientWidth, h = stage!.clientHeight;
      markers.forEach(m => {
        const lbl = labelRefs.current[m.origin.id];
        if (!lbl) return;
        m.dot.getWorldPosition(wp);
        const facing = wp.clone().normalize().dot(camDir);
        wp.project(camera);
        const px = (wp.x * 0.5 + 0.5) * w;
        const py = (-wp.y * 0.5 + 0.5) * h;
        const offX = wp.x > 0 ? 72 : -72;
        const tx   = wp.x > 0 ? 0 : -100;
        lbl.style.left      = `${px}px`;
        lbl.style.top       = `${py}px`;
        lbl.style.transform = `translate(${tx}%,-50%) translateX(${offX}px)`;
        lbl.classList.toggle("show", facing > 0.18);
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="cg-stage" ref={stageRef}>
      <canvas ref={canvasRef} className="cg-canvas" />

      <div className="cg-overlay">
        {ORIGINS.map(o => (
          <div key={o.id} ref={el => { labelRefs.current[o.id] = el; }} className="cg-label">
            <span className="cg-label__region">{o.region}</span>
            {o.name}
          </div>
        ))}
      </div>

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
              <Image src={selectedOrigin.image} alt={selectedOrigin.name} fill className="cg-modal__img" sizes="460px" />
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
