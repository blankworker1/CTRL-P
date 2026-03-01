(function () {
  const EPOCH = Date.parse("2026-03-03T00:00:00Z");
  const STATE_DURATION_HOURS = 144; // 6 days
  const CYCLE_HOURS = 720;          // 30 days

  // Returns current state and next transition timestamp
  function getState() {
    const now = Date.now();
    const elapsedMs = now - EPOCH;
    const elapsedHours = elapsedMs / (1000 * 60 * 60);

    const normalized = ((elapsedHours % CYCLE_HOURS) + CYCLE_HOURS) % CYCLE_HOURS;
    const state = Math.floor(normalized / STATE_DURATION_HOURS);

    const phaseStart = EPOCH + state * STATE_DURATION_HOURS * 60 * 60 * 1000;
    const nextTransition = phaseStart + STATE_DURATION_HOURS * 60 * 60 * 1000;

    return { state, phaseStart, nextTransition };
  }

  // Create SVG clock for a given state
  function createSVG(state, size = 100) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", "0 0 100 100");

    // Background circle (white)
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "50");
    circle.setAttribute("fill", "white");
    svg.appendChild(circle);

    // Black overlay rectangle
    const overlay = document.createElementNS(svgNS, "rect");
    overlay.setAttribute("y", "0");
    overlay.setAttribute("height", "100");
    overlay.setAttribute("fill", "black");

    switch (state) {
      case 0: overlay.setAttribute("x","0"); overlay.setAttribute("width","100"); break;
      case 1: overlay.setAttribute("x","0"); overlay.setAttribute("width","33.333"); break;
      case 2: overlay.setAttribute("x","0"); overlay.setAttribute("width","66.666"); break;
      case 3: overlay.setAttribute("x","33.333"); overlay.setAttribute("width","66.666"); break;
      case 4: overlay.setAttribute("x","66.666"); overlay.setAttribute("width","33.333"); break;
    }

    svg.appendChild(overlay);
    return svg;
  }

  // Render the live clock and schedule next update
  function renderClock() {
    const elements = document.querySelectorAll("[data-ctrlp-clock]");
    const { state, nextTransition } = getState();

    // Update each clock element
    elements.forEach(el => {
      const size = el.getAttribute("data-size") || 100;
      el.innerHTML = "";
      el.appendChild(createSVG(state, size));
    });

    // Schedule next render exactly at phase transition
    const now = Date.now();
    const delay = nextTransition - now + 50; // 50ms buffer
    setTimeout(renderClock, delay);
  }

  // Start clock on DOM ready
  document.addEventListener("DOMContentLoaded", renderClock);

  // Expose createSVG globally for preview row
  window.createSVG = createSVG;
})();




