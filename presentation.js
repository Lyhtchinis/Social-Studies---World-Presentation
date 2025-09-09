(() => {
  // ===== EDIT THESE =====
  const preset = {
    nationName: "Lajelândia",
    motto: "Through Sea and Stone",
    capital: "Port Ardent",
    govt: "Unitary democratic socialist republic",
    mapFile: "Viena.map",   // same folder as this JS (or adjust)
    flagUrl: "flag.png"     // same folder (or adjust)
  };

  // Lajelândia facts
  const facts = {
    flagMeaning: [
      { title: "Green (top stripe)",  text: "Natural landscapes, agriculture, and harmony between people and nature." },
      { title: "Yellow (middle stripe)", text: "Prosperity, wealth, and hope for a bright future." },
      { title: "Blue (bottom stripe)", text: "Peace, unity, and the oceans." },
      { title: "Eight-Pointed Star (center)", text: "Guiding light of the nation, diversity, and the unity of all its states." }
    ],
    territory: "~640,000 km²",
    population: "~35 million inhabitants",
    language: "Lajelês (inspired by Portuguese)",
    currency: "Dólar lagiano (LJ$)",
    literacy: "97%",
    economy: "Sustainable agriculture, technology, responsible mining, cultural tourism",
    culture: "Musical diversity, national festivals, strong literary tradition",
    sports: "Surfing and Jiu Jitsu",
    environment: "40% of the territory protected by natural reserves",
    systemOfGovernment: "Unitary",
    typeOfGovernment: "Democracy",
    economicSystem: "Mixed economy"
  };

  // ---- resolve assets relative to THIS script file (works even if JS is in a subfolder) ----
  const __SCRIPT_SRC__ =
    (document.currentScript && document.currentScript.src) ||
    (document.scripts && document.scripts[document.scripts.length - 1]?.src) || null;

  const resolve = (file) => __SCRIPT_SRC__ ? new URL(file, __SCRIPT_SRC__).toString() : file;
  const MAP_URL  = resolve(preset.mapFile);
  const FLAG_URL = resolve(preset.flagUrl);

  // ---- helpers ----
  const safe  = (fn, fb="N/A") => { try { const v = fn(); return v ?? fb; } catch { return fb; } };
  const fmtInt = n => n>=1e6 ? (n/1e6).toFixed(2)+"M" : n>=1e3 ? (n/1e3).toFixed(1)+"k" : (n|0);
  const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const card = (title, html) => {
    const d = document.createElement("div");
    d.className = "card";
    d.innerHTML = `<h3>${title}</h3>${html}`;
    return d;
  };

  // ---- build UI ----
  function mountPanel() {
    // toggle chip
    const chip = document.createElement("div");
    chip.id = "presenter-chip";
    chip.textContent = "Presenter (i)";
    document.body.appendChild(chip);

    // sheet
    const box = document.createElement("div");
    box.id = "presenter";
    box.innerHTML = `
      <div class="sheet-header">
        <div class="handle" title="Drag to resize • double-click to cycle"></div>
        <h2>${preset.nationName}</h2>
        <div class="meta">Press “I” to toggle</div>
      </div>
      <div class="content" id="presenter-content"></div>
    `;
    // restore last height
    const saved = parseFloat(localStorage.getItem("presenter.heightVh"));
    if (!isNaN(saved)) box.style.height = saved + "vh";
    document.body.appendChild(box);

    // content cards (bullet style)
    const content = document.getElementById("presenter-content");

    const flagBullets = facts.flagMeaning
      .map(f => `<li><b>${f.title}:</b> ${f.text}</li>`)
      .join("");

    // 1) Flag & National Identity
    const flagCard = card("Flag & National Identity", `
      <div class="flag">
        <img src="${FLAG_URL}" alt="Flag of ${preset.nationName}">
        <ul>${flagBullets}</ul>
      </div>
    `);
    flagCard.classList.add("span2");

    // 2) Geography & Territory (map is shown above; keep concise)
    const geoCard = card("Geography & Territory", `
      <ul>
        <li><b>3D Map:</b> Interactive terrain, coastline, and relief (see viewer above)</li>
        <li><b>Area:</b> ${facts.territory}</li>
        <li><b>Climate:</b> Tropical → subtropical islands</li>
        <li><b>Protected Areas:</b> ${facts.environment}</li>
      </ul>
    `);

    // 3) Origins of the State
    const originsCard = card("Origins of the State", `
      <ul>
        <li>Founded through a <b>social contract</b> uniting coastal communities</li>
        <li>Shared principles: sustainability, prosperity, equality</li>
        <li>Constitution ratified at independence</li>
      </ul>
    `);

    // 4) Government System
    const govSysCard = card("Government System", `
      <ul>
        <li><b>System:</b> ${facts.systemOfGovernment}</li>
        <li><b>Type:</b> ${facts.typeOfGovernment}</li>
        <li><b>Constitutional Principles:</b></li>
        <ul>
          <li>Free & fair elections</li>
          <li>Freedom of speech & religion</li>
          <li>Right to education & healthcare</li>
          <li>Environmental protection</li>
          <li>Equality before the law</li>
        </ul>
      </ul>
    `);

    // 5) Functions of Government (with maritime emphasis)
    const functionsCard = card("Functions of Government", `
      <ul>
        <li><b>Leadership:</b> Elected parliament & president</li>
        <li><b>Order:</b> Independent judiciary, national police</li>
        <li><b>Public Services:</b> Healthcare, education, ports & coastal infrastructure</li>
        <li><b>National Security:</b> Navy & Coast Guard for EEZ patrol, SAR, anti-smuggling</li>
        <li><b>Economic Security:</b> Mixed-economy regulation, maritime trade facilitation</li>
      </ul>
    `);
    functionsCard.classList.add("span2");

    // 6) Economic System (maritime sectors highlighted)
    const econCard = card("Economic System", `
      <ul>
        <li><b>Type:</b> ${facts.economicSystem}</li>
        <li><b>Main Sectors:</b></li>
        <ul>
          <li>Sustainable agriculture</li>
          <li>Technology & innovation (“blue tech” for oceans)</li>
          <li>Responsible mining</li>
          <li>Cultural tourism</li>
          <li><b>Maritime industries:</b> shipbuilding & repair, port logistics, fisheries, offshore wind</li>
        </ul>
        <li><b>Citizen Impact:</b> affordable services, entrepreneurship, stable LJ$</li>
      </ul>
    `);
    econCard.classList.add("span2");

    // 7) Society & Culture (maritime identity emphasized)
    const societyCard = card("Society & Culture", `
      <ul>
        <li><b>Population:</b> ${facts.population}</li>
        <li><b>Language:</b> ${facts.language}</li>
        <li><b>Religion:</b> Pluralistic; freedom guaranteed</li>
        <li><b>Maritime Identity:</b> seafaring heritage, coastal cuisine, island festivals</li>
        <li><b>Culture:</b> ${facts.culture}</li>
        <li><b>Sports:</b> ${facts.sports} (surf coast circuits & beach arenas)</li>
      </ul>
    `);
    societyCard.classList.add("span2");

    // 8) States/Provinces (FMG)
    const statesCard = card("States / Provinces", `
      <ul>
        <li>Unitary state with administrative provinces</li>
        <li>Examples: Ardent Coast, Verde Plateau, Azul Bay…</li>
        <li>Regions reflect coastal vs. interior identities</li>
      </ul>
    `);

    // 9) Military & Defense (island focus)
    const milCard = card("Military & Defense", `
      <ul>
        <li><b>Doctrine:</b> Defensive, peace-oriented</li>
        <li><b>Navy & Coast Guard:</b> EEZ patrol, search & rescue, maritime law enforcement</li>
        <li><b>Air Wing:</b> coastal surveillance & disaster response</li>
      </ul>
    `);

    // 10) Controls (technical)
    const ctlCard = card("Controls", `
      <div class="row">
        <button id="btnLoadMap" class="ghost" title="${preset.mapFile}">Load map</button>
      </div>
      <div class="muted" style="margin-top:6px">3D viewer & FMG controls remain unchanged above.</div>
    `);

    // Optional: make the “hero” content bigger for presentation
    // flagCard.span2 (already set), functions/econ/society span2 for readability
    // You can also make one full-width row if desired:
    // e.g., econCard.classList.add("span3");

    // Append in your preferred order (yields a 3/3/2-ish layout with the CSS grid)
    content.append(
      flagCard,
      geoCard,
      originsCard,
      govSysCard,
      functionsCard,
      econCard,
      societyCard,
      statesCard,
      milCard,
      ctlCard
    );

    // Wire the button
    document.getElementById("btnLoadMap")?.addEventListener("click", loadProjectMap);

    // show/hide
    const toggle = () => box.classList.toggle("hidden");
    chip.addEventListener("click", toggle);
    document.addEventListener("keydown", e => (e.key||"").toLowerCase()==="i" && toggle());

    // enable drag-resize + double-click cycle
    enableResize(box);

    // load map
    document.getElementById("btnLoadMap")?.addEventListener("click", loadProjectMap);
  }

  // ---- resize logic (drag to any height, remember in localStorage) ----
  function enableResize(sheet){
    const handle = sheet.querySelector(".handle");
    if (!handle) return;

    let startY = 0, startH = 0, dragging = false;
    const clamp = (vh) => Math.max(24, Math.min(85, vh)); // min/max heights

    const onMove = (e) => {
      if (!dragging) return;
      const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      const dy = y - startY;
      const newPx = startH - dy; // dragging up increases height
      const vh = clamp((newPx / innerHeight) * 100);
      sheet.style.height = vh + "vh";
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      sheet.classList.remove("resizing");
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseup", onUp);
      removeEventListener("touchmove", onMove);
      removeEventListener("touchend", onUp);
      const vh = parseFloat(sheet.style.height) || 42;
      localStorage.setItem("presenter.heightVh", vh.toFixed(1));
    };

    const onDown = (e) => {
      dragging = true;
      sheet.classList.add("resizing");
      startY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      startH = sheet.getBoundingClientRect().height;
      addEventListener("mousemove", onMove);
      addEventListener("mouseup", onUp);
      addEventListener("touchmove", onMove, {passive:false});
      addEventListener("touchend", onUp);
      e.preventDefault();
    };

    handle.addEventListener("mousedown", onDown);
    handle.addEventListener("touchstart", onDown, {passive:false});

    // quick size cycle on double-click
    const sizes = [28, 42, 65];
    handle.addEventListener("dblclick", () => {
      const current = parseFloat(sheet.style.height) || 42;
      const idx = (sizes.findIndex(v => Math.abs(v-current) < 1) + 1) % sizes.length;
      sheet.style.height = sizes[idx] + "vh";
      localStorage.setItem("presenter.heightVh", sizes[idx]);
    });
  }

  // ---- stats (called on map load) ----
  function refreshStats() {
    const pack = window.pack;
    if (!pack) return;

    const pop = (() => {
      try {
        if (pack.cells?.population?.reduce) {
          const sum = pack.cells.population.reduce((a,b)=>a+b,0);
          return fmtInt(Math.round(sum));
        }
        if (Array.isArray(pack.states)) {
          const sum = pack.states.filter(s=>s && s.i && !s.removed)
                                 .reduce((a,s)=>a+(s.population||0),0);
          return fmtInt(Math.round(sum));
        }
      } catch {}
      return null;
    })();

    if (pop) setTxt("pPop", pop);
  }

  // ---- map loading (no FMG UI interference) ----
  async function loadProjectMap() {
    try {
      const res = await fetch(MAP_URL + (MAP_URL.includes("?") ? "&" : "?") + "cb=" + Date.now(), {cache: "no-store"});
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${MAP_URL}`);
      const text = await res.text();

      const w = window;
      const get = p => p.split(".").reduce((a,k)=>a?.[k], w);

      const u1 = get("uploadMapData");
      if (typeof u1 === "function") { u1(text); return void setTimeout(refreshStats, 500); }

      const u2 = get("editor.uploadMapData");
      if (typeof u2 === "function") { u2(text); return void setTimeout(refreshStats, 500); }

      const u3 = get("parseLoadedMap");
      if (typeof u3 === "function") { u3(text); return void setTimeout(refreshStats, 500); }

      const u4 = get("restore");
      if (typeof u4 === "function") { u4(w.pack, text); return void setTimeout(refreshStats, 500); }

      // Fallback: simulate a file drop
      const file = new File([text], preset.mapFile, {type: "text/plain"});
      const dt = new DataTransfer(); dt.items.add(file);
      const ev = new DragEvent("drop", {bubbles:true, cancelable:true, dataTransfer:dt});
      (document.getElementById("map") || document.body).dispatchEvent(ev);
      setTimeout(refreshStats, 500);
    } catch (err) {
      console.error("Presenter: map load failed:", err);
      alert("Couldn't load the map automatically. Use FMG → Open and select the .map.\nSee console for details.");
    }
  }

  // ---- boot ----
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountPanel, {once:true});
  } else {
    mountPanel();
  }
})();
