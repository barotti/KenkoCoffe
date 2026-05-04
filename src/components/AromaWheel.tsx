"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type NoteData = { name: string; desc: string; blends: string[] };
type CategoryData = { name: string; color: string; notes: NoteData[] };

const CATEGORIES: CategoryData[] = [
  { name: "Floreale", color: "#c9a3a8", notes: [
    { name: "Fiori bianchi", desc: "Un profumo delicato di gelsomino e fiori d'arancio, tipico delle arabiche etiopi di alta quota. Al naso prima ancora che in bocca.", blends: ["100"] },
    { name: "Camomilla", desc: "Una rotondità erbacea-floreale che ricorda i fiori essiccati. Spesso emerge nel finale di una tazza ben estratta.", blends: ["100"] },
    { name: "Bergamotto", desc: "L'agrume più floreale di tutti. Una nota brillante che attraversa il palato e accompagna l'acidità.", blends: [] },
  ]},
  { name: "Fruttato", color: "#c46e4f", notes: [
    { name: "Frutti rossi", desc: "Lampone, mirtillo, ciliegia matura. Una dolcezza vivace tipica del nostro Blend 80/20, che chiude il sorso con freschezza.", blends: ["8020"] },
    { name: "Agrumi", desc: "Note di scorza di limone e arancia rossa. La firma luminosa del nostro Blend 100% in apertura.", blends: ["100"] },
    { name: "Frutta secca", desc: "Albicocca disidratata, datteri, uva passa. Profondità mediterranea che si distende sul palato.", blends: ["8020"] },
  ]},
  { name: "Dolce", color: "#d4a259", notes: [
    { name: "Sciroppo d'acero", desc: "Una dolcezza profonda e leggermente caramellata, distintiva del Blend 80/20. Il retrogusto che resta dopo l'ultimo sorso.", blends: ["8020"] },
    { name: "Miele millefiori", desc: "Dolcezza florale e delicata, il tratto distintivo del Blend 100%. Naturale, mai zuccherina.", blends: ["100"] },
    { name: "Caramello", desc: "Tostatura dolce che evoca lo zucchero cotto. Aggiunge corpo e rotondità in tazza.", blends: ["8020"] },
  ]},
  { name: "Cacao", color: "#6b4423", notes: [
    { name: "Cioccolato fondente", desc: "La nota più riconoscibile del Blend 80/20. Una rotondità amara nobile, che sostiene tutta la tazza.", blends: ["8020"] },
    { name: "Cacao chiaro", desc: "Più delicato del fondente, lattico, da cioccolato al latte di qualità. La firma morbida del Blend 100%.", blends: ["100"] },
    { name: "Cacao tostato", desc: "Note brune e leggermente affumicate, tipiche di chicchi a tostatura più scura.", blends: [] },
  ]},
  { name: "Tostato", color: "#3d2817", notes: [
    { name: "Tabacco dolce", desc: "Note brune e calde che ricordano il tabacco da pipa. Profondità classica delle nostre tostature.", blends: ["8020"] },
    { name: "Cereali tostati", desc: "Pane appena cotto e malto. La struttura solida che fa da spina dorsale al sorso.", blends: ["8020"] },
    { name: "Affumicato", desc: "Una vena minerale e tostata, sottile, da chicchi a tostatura medio-scura.", blends: [] },
  ]},
  { name: "Speziato", color: "#a05a2c", notes: [
    { name: "Cannella", desc: "Una scia speziata calda che bilancia la dolcezza. Spesso percepibile nel finale del Blend 100%.", blends: ["100"] },
    { name: "Pepe nero", desc: "Vivacità leggera che accende il palato. Una caratteristica delle robuste indiane.", blends: [] },
    { name: "Cardamomo", desc: "Aroma fresco e mentolato, tipico dei caffè etiopi delle terre alte.", blends: [] },
  ]},
  { name: "Nocciolato", color: "#a8825e", notes: [
    { name: "Nocciola tostata", desc: "Un classico del caffè italiano. Cremosa, oleosa, calda. Centrale nel Blend 80/20.", blends: ["8020"] },
    { name: "Mandorla dolce", desc: "Più delicata della nocciola, con un finale leggermente lattico. Nota del Blend 100%.", blends: ["100"] },
    { name: "Burro fresco", desc: "Una rotondità grassa e avvolgente, che dà cremosità alla tazza espressa.", blends: [] },
  ]},
  { name: "Vegetale", color: "#5a7d3a", notes: [
    { name: "Tè verde", desc: "Una freschezza erbacea raffinata, percepibile nelle arabiche etiopi del Blend 100%.", blends: ["100"] },
    { name: "Erba fresca", desc: "Note vegetali brillanti che accompagnano un'acidità vivace.", blends: [] },
    { name: "Eucalipto", desc: "Un soffio mentolato che pulisce il palato. Caratteristica dei caffè di alta quota.", blends: [] },
  ]},
];

const BLENDS: Record<string, { name: string; origins: string }> = {
  "8020": { name: "Blend 80/20", origins: "Colombia · Brasile · Nicaragua · India" },
  "100":  { name: "Blend 100% Arabica", origins: "Colombia · Brasile · Sidamo" },
};

const CX = 320, CY = 320;
const R_INNER = 95, R_CAT = 175, R_OUTER = 290;
const R_CAT_T = 135, R_NOTE_T = 232;
const CAT_DEG = 45, NOTE_DEG = 15;
const SVG_NS = "http://www.w3.org/2000/svg";
const XL_NS  = "http://www.w3.org/1999/xlink";

function polar(r: number, deg: number) {
  const a = (deg - 90) * Math.PI / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function annularSector(rIn: number, rOut: number, s: number, e: number) {
  const p1 = polar(rOut, s), p2 = polar(rOut, e);
  const p3 = polar(rIn, e),  p4 = polar(rIn, s);
  const la = (e - s) > 180 ? 1 : 0;
  return [
    `M ${p1.x} ${p1.y}`, `A ${rOut} ${rOut} 0 ${la} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`, `A ${rIn} ${rIn} 0 ${la} 0 ${p4.x} ${p4.y}`, "Z",
  ].join(" ");
}

function arcPath(r: number, s: number, e: number) {
  const mid = (s + e) / 2;
  if (!(mid > 90 && mid < 270)) {
    const a = polar(r, s), b = polar(r, e);
    return `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`;
  }
  const a = polar(r, e), b = polar(r, s);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 0 0 ${b.x} ${b.y}`;
}

function lighten(hex: string, t: number) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return `rgb(${Math.round(r+(255-r)*t)},${Math.round(g+(255-g)*t)},${Math.round(b+(255-b)*t)})`;
}

export function AromaWheel() {
  const svgRef       = useRef<SVGSVGElement>(null);
  const centerRef    = useRef<HTMLDivElement>(null);
  const catRef       = useRef<HTMLDivElement>(null);
  const noteRef      = useRef<HTMLDivElement>(null);
  const dCatRef      = useRef<HTMLDivElement>(null);
  const dNameRef     = useRef<HTMLHeadingElement>(null);
  const dDescRef     = useRef<HTMLParagraphElement>(null);
  const blendListRef = useRef<HTMLDivElement>(null);
  const emptyRef     = useRef<HTMLDivElement>(null);
  const selRef       = useRef<HTMLDivElement>(null);
  const filterRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg       = svgRef.current;
    const center    = centerRef.current;
    const catEl     = catRef.current;
    const noteEl    = noteRef.current;
    const dCat      = dCatRef.current;
    const dName     = dNameRef.current;
    const dDesc     = dDescRef.current;
    const blendList = blendListRef.current;
    const empty     = emptyRef.current;
    const sel       = selRef.current;
    const filterRow = filterRowRef.current;

    if (!svg||!center||!catEl||!noteEl||!dCat||!dName||!dDesc||!blendList||!empty||!sel||!filterRow) return;

    let chosen: { ci: number; ni: number } | null = null;
    let activeFilter = "all";

    // outer ring
    const ring = document.createElementNS(SVG_NS, "circle");
    ring.setAttribute("cx", String(CX)); ring.setAttribute("cy", String(CY));
    ring.setAttribute("r", String(R_OUTER+8)); ring.setAttribute("fill", "none");
    ring.setAttribute("stroke", "#1F7A3A"); ring.setAttribute("stroke-width", "0.8"); ring.setAttribute("opacity", "0.4");
    svg.appendChild(ring);

    // tick marks
    for (let i = 0; i < 8; i++) {
      const p1 = polar(R_OUTER+8, i*45), p2 = polar(R_OUTER+18, i*45);
      const tick = document.createElementNS(SVG_NS, "line");
      tick.setAttribute("x1", String(p1.x)); tick.setAttribute("y1", String(p1.y));
      tick.setAttribute("x2", String(p2.x)); tick.setAttribute("y2", String(p2.y));
      tick.setAttribute("stroke", "#1F7A3A"); tick.setAttribute("stroke-width", "1"); tick.setAttribute("opacity", "0.55");
      svg.appendChild(tick);
    }

    const defs = document.createElementNS(SVG_NS, "defs");
    svg.appendChild(defs);

    CATEGORIES.forEach((cat, ci) => {
      const catStart = ci * CAT_DEG, catEnd = catStart + CAT_DEG;

      const cg = document.createElementNS(SVG_NS, "g");
      cg.classList.add("aw-slice", "aw-cat-slice");
      cg.dataset.cat = String(ci);
      const cp = document.createElementNS(SVG_NS, "path");
      cp.setAttribute("d", annularSector(R_INNER, R_CAT, catStart, catEnd));
      cp.setAttribute("fill", cat.color); cp.setAttribute("stroke", "#F3EFE8"); cp.setAttribute("stroke-width", "1.5");
      cp.classList.add("aw-fill");
      cg.appendChild(cp);

      const cid = `aw-cat-arc-${ci}`;
      const carc = document.createElementNS(SVG_NS, "path");
      carc.id = cid; carc.setAttribute("d", arcPath(R_CAT_T, catStart+1.5, catEnd-1.5)); carc.setAttribute("fill", "none");
      defs.appendChild(carc);

      const ct = document.createElementNS(SVG_NS, "text");
      ct.classList.add("aw-cat-text");
      const ctp = document.createElementNS(SVG_NS, "textPath");
      ctp.setAttributeNS(XL_NS, "xlink:href", `#${cid}`); ctp.setAttribute("href", `#${cid}`);
      ctp.setAttribute("startOffset", "50%"); ctp.setAttribute("text-anchor", "middle");
      ctp.textContent = cat.name;
      ct.appendChild(ctp); cg.appendChild(ct); svg.appendChild(cg);

      cat.notes.forEach((note, ni) => {
        const noteStart = catStart + ni * NOTE_DEG, noteEnd = noteStart + NOTE_DEG;

        const ng = document.createElementNS(SVG_NS, "g");
        ng.classList.add("aw-slice", "aw-note-slice");
        ng.dataset.cat = String(ci); ng.dataset.note = String(ni); ng.dataset.blends = note.blends.join(",");

        const np = document.createElementNS(SVG_NS, "path");
        np.setAttribute("d", annularSector(R_CAT, R_OUTER, noteStart, noteEnd));
        np.setAttribute("fill", lighten(cat.color, 0.45)); np.setAttribute("stroke", "#F3EFE8"); np.setAttribute("stroke-width", "1");
        np.classList.add("aw-fill");
        ng.appendChild(np);

        if (note.blends.length > 0) {
          const mp = polar(R_CAT+12, noteStart+NOTE_DEG/2);
          const mk = document.createElementNS(SVG_NS, "circle");
          mk.setAttribute("cx", String(mp.x)); mk.setAttribute("cy", String(mp.y));
          mk.setAttribute("r", "3"); mk.setAttribute("fill", "#1F7A3A");
          ng.appendChild(mk);
        }

        const nid = `aw-note-arc-${ci}-${ni}`;
        const narc = document.createElementNS(SVG_NS, "path");
        narc.id = nid; narc.setAttribute("d", arcPath(R_NOTE_T, noteStart+1, noteEnd-1)); narc.setAttribute("fill", "none");
        defs.appendChild(narc);

        const nt = document.createElementNS(SVG_NS, "text");
        nt.classList.add("aw-note-text");
        const ntp = document.createElementNS(SVG_NS, "textPath");
        ntp.setAttributeNS(XL_NS, "xlink:href", `#${nid}`); ntp.setAttribute("href", `#${nid}`);
        ntp.setAttribute("startOffset", "50%"); ntp.setAttribute("text-anchor", "middle");
        ntp.textContent = note.name.toUpperCase();
        nt.appendChild(ntp); ng.appendChild(nt); svg.appendChild(ng);
      });
    });

    const innerRing = document.createElementNS(SVG_NS, "circle");
    innerRing.setAttribute("cx", String(CX)); innerRing.setAttribute("cy", String(CY));
    innerRing.setAttribute("r", String(R_INNER)); innerRing.setAttribute("fill", "none");
    innerRing.setAttribute("stroke", "#0E0E0E"); innerRing.setAttribute("stroke-width", "1"); innerRing.setAttribute("opacity", "0.15");
    svg.appendChild(innerRing);

    function applyFilter() {
      svg!.querySelectorAll<SVGGElement>(".aw-note-slice").forEach(g => {
        const bl = (g.dataset.blends||"").split(",").filter(Boolean);
        g.classList.toggle("aw-dim", activeFilter !== "all" && !bl.includes(activeFilter));
      });
      svg!.querySelectorAll<SVGGElement>(".aw-cat-slice").forEach(g => {
        if (activeFilter === "all") { g.classList.remove("aw-dim"); return; }
        const ci2 = parseInt(g.dataset.cat||"0");
        g.classList.toggle("aw-dim", !CATEGORIES[ci2].notes.some(n => n.blends.includes(activeFilter)));
      });
    }

    function showNote(ci: number, ni: number) {
      const cat = CATEGORIES[ci], note = cat.notes[ni];
      catEl!.textContent = cat.name; noteEl!.textContent = note.name;
      center!.classList.add("aw-has-selection");
      dCat!.textContent = cat.name; dName!.textContent = note.name; dDesc!.textContent = note.desc;
      blendList!.innerHTML = "";
      ["8020","100"].forEach(key => {
        const b = BLENDS[key], inB = note.blends.includes(key);
        const div = document.createElement("div");
        div.className = `aw-blend-item${inB ? " aw-blend-item--on" : " aw-blend-item--off"}`;
        div.innerHTML = `<div class="aw-blend-num">${key==="8020"?"80/20":"100%"}</div><div class="aw-blend-info"><div class="aw-blend-title">${b.name}</div><div class="aw-blend-origins">${b.origins}</div></div><div class="aw-blend-check">${inB?"✓":"—"}</div>`;
        blendList!.appendChild(div);
      });
      empty!.classList.remove("aw-show"); sel!.classList.add("aw-show");
    }

    function clearNote() {
      center!.classList.remove("aw-has-selection");
      empty!.classList.add("aw-show"); sel!.classList.remove("aw-show");
      svg!.querySelectorAll(".aw-selected").forEach(el => el.classList.remove("aw-selected"));
      chosen = null;
    }

    svg.querySelectorAll<SVGGElement>(".aw-note-slice").forEach(g => {
      g.addEventListener("mouseenter", () => {
        if (g.classList.contains("aw-dim") || chosen) return;
        const ci = parseInt(g.dataset.cat||"0"), ni = parseInt(g.dataset.note||"0");
        catEl!.textContent = CATEGORIES[ci].name; noteEl!.textContent = CATEGORIES[ci].notes[ni].name;
        center!.classList.add("aw-has-selection");
      });
      g.addEventListener("mouseleave", () => {
        if (chosen) {
          catEl!.textContent = CATEGORIES[chosen.ci].name;
          noteEl!.textContent = CATEGORIES[chosen.ci].notes[chosen.ni].name;
        } else { center!.classList.remove("aw-has-selection"); }
      });
      g.addEventListener("click", () => {
        if (g.classList.contains("aw-dim")) return;
        const ci = parseInt(g.dataset.cat||"0"), ni = parseInt(g.dataset.note||"0");
        if (chosen && chosen.ci===ci && chosen.ni===ni) { clearNote(); return; }
        chosen = { ci, ni };
        svg!.querySelectorAll(".aw-selected").forEach(el => el.classList.remove("aw-selected"));
        g.classList.add("aw-selected"); showNote(ci, ni);
      });
    });

    svg.querySelectorAll<SVGGElement>(".aw-cat-slice").forEach(g => {
      g.addEventListener("click", () => {
        if (g.classList.contains("aw-dim")) return;
        const ci = parseInt(g.dataset.cat||"0");
        let ni = 0;
        if (activeFilter !== "all") ni = Math.max(0, CATEGORIES[ci].notes.findIndex(n => n.blends.includes(activeFilter)));
        svg!.querySelector<SVGGElement>(`.aw-note-slice[data-cat="${ci}"][data-note="${ni}"]`)?.dispatchEvent(new MouseEvent("click"));
      });
    });

    svg.addEventListener("click", e => { if (e.target === svg) clearNote(); });

    filterRow.querySelectorAll<HTMLButtonElement>(".aw-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filterRow!.querySelectorAll(".aw-filter-btn").forEach(b => b.classList.remove("aw-filter-btn--active"));
        btn.classList.add("aw-filter-btn--active");
        activeFilter = btn.dataset.filter||"all";
        applyFilter();
        if (chosen) {
          const note = CATEGORIES[chosen.ci].notes[chosen.ni];
          if (activeFilter !== "all" && !note.blends.includes(activeFilter)) clearNote();
        }
      });
    });

    return () => { while (svg.firstChild) svg.removeChild(svg.firstChild); };
  }, []);

  return (
    <section className="aw-section" id="origini">
      <header className="aw-section-head">
        <div>
          <div className="aw-eyebrow">Il gusto <strong className="brand-name">Kenkō</strong> · La carta sensoriale</div>
          <h2 className="aw-title">La ruota degli <em>aromi.</em></h2>
        </div>
        <div className="aw-head-right">
          <p>
            Ogni tazza <strong className="brand-name">Kenkō</strong> è un viaggio attraverso <em>otto famiglie aromatiche</em>.
            Scegli una nota: ti diremo quale dei nostri due blend la custodisce, e perché.
          </p>
          <div className="aw-filter-row" ref={filterRowRef}>
            <button className="aw-filter-btn aw-filter-btn--active" data-filter="all">Tutti gli aromi</button>
            <button className="aw-filter-btn" data-filter="8020">Solo Blend 80/20</button>
            <button className="aw-filter-btn" data-filter="100">Solo Blend 100%</button>
          </div>
        </div>
      </header>

      <div className="aw-wheel-layout">
        <div className="aw-wheel-stage">
          <svg ref={svgRef} className="aw-wheel-svg" viewBox="0 0 640 640" aria-label="Ruota degli aromi del caffè Kenkō" />
          <div className="aw-wheel-center" ref={centerRef}>
            <div className="aw-center-default">
              <Image src="/images/home/LOGO.PNG" alt="Kenkō" width={80} height={80} className="aw-center-logo" />
            </div>
            <div className="aw-center-active">
              <div className="aw-cat-name" ref={catRef} />
              <div className="aw-note-name" ref={noteRef} />
            </div>
          </div>
        </div>

        <aside className="aw-detail-panel">
          <div className="aw-detail-corner">№ 03 · Tasting</div>
          <div className="aw-panel-content aw-show" ref={emptyRef}>
            <div className="aw-detail-empty">
              <div className="aw-detail-empty-mark">&ldquo;</div>
              <p>Il caffè non si beve.<br /><em style={{ color: "#1F7A3A" }}>Si ascolta.</em></p>
              <div className="aw-hint">Scegli una nota dalla ruota →</div>
            </div>
          </div>
          <div className="aw-panel-content" ref={selRef}>
            <div className="aw-detail-eyebrow" ref={dCatRef} />
            <h2 className="aw-detail-name" ref={dNameRef} />
            <p className="aw-detail-desc" ref={dDescRef} />
            <div className="aw-detail-blends-label">Trovi questa nota in</div>
            <div className="aw-blend-list" ref={blendListRef} />
          </div>
        </aside>
      </div>

      <div className="aw-legend">
        <div className="aw-legend-item">
          <h4>01 / Otto famiglie</h4>
          <p>La nostra ruota raggruppa gli aromi in <strong>otto categorie principali</strong>: floreale, fruttato, dolce, cacao, tostato, speziato, nocciolato, vegetale.</p>
        </div>
        <div className="aw-legend-item">
          <h4>02 / Note in tazza</h4>
          <p>Ogni famiglia raccoglie <strong>tre note specifiche</strong> che possono emergere durante l&apos;assaggio, a seconda dell&apos;origine, della tostatura e dell&apos;estrazione.</p>
        </div>
        <div className="aw-legend-item">
          <h4>03 / I blend <strong className="brand-name">Kenkō</strong></h4>
          <p>Le note <strong>verdi</strong> sono presenti nei nostri due blend: <em>80/20</em> per chi cerca corpo e dolcezza decisa, <em>100%</em> per chi ama la finezza pura.</p>
        </div>
      </div>

      <div className="aw-foot">
        <span><strong className="brand-name">Kenkō Kohi</strong> · The Origin of Quality</span>
        <span className="aw-triangle-mini">▽</span>
        <span>Carta aromatica · Edizione 2026</span>
      </div>
    </section>
  );
}
