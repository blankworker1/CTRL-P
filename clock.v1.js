(function () {
  const EPOCH = Date.parse("2026-03-03T00:00:00Z");
  const STATE_DURATION_HOURS = 144;
  const CYCLE_HOURS = 720;

  function getState() {
    const now = Date.now();
    const elapsedMs = now - EPOCH;
    const elapsedHours = elapsedMs / (1000 * 60 * 60);

    const normalized =
      ((elapsedHours % CYCLE_HOURS) + CYCLE_HOURS) % CYCLE_HOURS;

    return Math.floor(normalized / STATE_DURATION_HOURS);
  }

  function createSVG(state, size = 100) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", "0 0 100 100");

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "50");
    circle.setAttribute("fill", "white");

    svg.appendChild(circle);

    const overlay = document.createElementNS(svgNS, "rect");
    overlay.setAttribute("y", "0");
    overlay.setAttribute("height", "100");
    overlay.setAttribute("fill", "black");

    switch (state) {
      case 0:
        overlay.setAttribute("x", "0");
        overlay.setAttribute("width", "100");
        break;
      case 1:
        overlay.setAttribute("x", "0");
        overlay.setAttribute("width", "33.333");
        break;
      case 2:
        overlay.setAttribute("x", "0");
        overlay.setAttribute("width", "66.666");
        break;
      case 3:
        overlay.setAttribute("x", "33.333");
        overlay.setAttribute("width", "66.666");
        break;
      case 4:
        overlay.setAttribute("x", "66.666");
        overlay.setAttribute("width", "33.333");
        break;
    }

    svg.appendChild(overlay);

    return svg;
  }

  function init() {
    const elements = document.querySelectorAll("[data-ctrlp-clock]");
    const state = getState();

    elements.forEach((el) => {
      const size = el.getAttribute("data-size") || 100;
      el.innerHTML = "";
      el.appendChild(createSVG(state, size));
    });
  }

  document.addEventListener("DOMContentLoaded", init);

  // Expose createSVG to global scope for preview purposes
  window.createSVG = createSVG;
})();

