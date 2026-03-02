(function () {

  const EPOCH = Date.parse("2026-03-03T00:00:00Z");
  const TOTAL_HOURS = 720; // 30 days
  const DEGREES_PER_HOUR = 360 / TOTAL_HOURS;

  // Compute hand angle based on current UTC time
  function getRotationAngle() {
    const now = Date.now();
    const elapsedHours = ((now - EPOCH) / (1000*60*60)) % TOTAL_HOURS;
    const normalized = (elapsedHours + TOTAL_HOURS) % TOTAL_HOURS;
    return normalized * DEGREES_PER_HOUR;
  }

  function createSVG() {
    const container = document.getElementById("clock");
    if (!container) return;
    container.innerHTML = "";

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 600 600");
    svg.setAttribute("id", "svgClock");

    // Outer circle
    const outer = document.createElementNS(svgNS, "circle");
    outer.setAttribute("cx", "300");
    outer.setAttribute("cy", "300");
    outer.setAttribute("r", "280");
    outer.setAttribute("stroke", "black");
    outer.setAttribute("stroke-width", "4");
    outer.setAttribute("fill", "white");
    svg.appendChild(outer);

    // Minor ticks (25)
    for (let i = 0; i < 25; i++) {
      const angle = i * (360/25);
      const rad = (angle - 90) * (Math.PI/180);
      const x1 = 300 + Math.cos(rad)*260;
      const y1 = 300 + Math.sin(rad)*260;
      const x2 = 300 + Math.cos(rad)*280;
      const y2 = 300 + Math.sin(rad)*280;

      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", "black");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);
    }

    // Major symbols (5) — moon phase style using clipPath
const symbolOrder = [0, 2, 1, 4, 3];
const circleR = 22;

for (let i = 0; i < 5; i++) {
  const angle = i * 72 - 90;
  const rad = angle * (Math.PI / 180);

  const group = document.createElementNS(svgNS, "g");
  group.setAttribute(
    "transform",
    `translate(${300 + Math.cos(rad) * 230}, ${300 + Math.sin(rad) * 230})`
  );

  const state = symbolOrder[i];
  const clipId = `clip-${i}`;

  // Define a clipPath shaped like the circle
  const defs = document.createElementNS(svgNS, "defs");
  const clipPath = document.createElementNS(svgNS, "clipPath");
  clipPath.setAttribute("id", clipId);
  const clipCircle = document.createElementNS(svgNS, "circle");
  clipCircle.setAttribute("cx", 0);
  clipCircle.setAttribute("cy", 0);
  clipCircle.setAttribute("r", circleR);
  clipPath.appendChild(clipCircle);
  defs.appendChild(clipPath);
  group.appendChild(defs);

  // White base circle
  const baseCircle = document.createElementNS(svgNS, "circle");
  baseCircle.setAttribute("cx", 0);
  baseCircle.setAttribute("cy", 0);
  baseCircle.setAttribute("r", circleR);
  baseCircle.setAttribute("fill", "white");
  baseCircle.setAttribute("stroke", "black");
  baseCircle.setAttribute("stroke-width", 2);
  group.appendChild(baseCircle);

  // Black rectangle clipped to circle shape (moon phase fill)
  let rectX, rectWidth;
  switch (state) {
    case 0: rectX = -circleR; rectWidth = 2 * circleR; break; // full
    case 1: rectX = -circleR; rectWidth = 14; break;           // 1/3 left
    case 2: rectX = -circleR; rectWidth = 28; break;           // 2/3 left
    case 3: rectX = -8;      rectWidth = 36; break;           // 2/3 right
    case 4: rectX = 8;        rectWidth = 14; break;           // 1/3 right
  }

  const rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("x", rectX);
  rect.setAttribute("y", -circleR);
  rect.setAttribute("width", rectWidth);
  rect.setAttribute("height", 2 * circleR);
  rect.setAttribute("fill", "black");
  rect.setAttribute("clip-path", `url(#${clipId})`);
  group.appendChild(rect);

  svg.appendChild(group);
}

    // Hand — shorter so tip is just under symbols
    const handAngle = getRotationAngle() - 90;
    const handRad = handAngle*(Math.PI/180);
    const hand = document.createElementNS(svgNS, "line");
    hand.setAttribute("x1","300");
    hand.setAttribute("y1","300");
    hand.setAttribute("x2", 300 + Math.cos(handRad)*200); // 200 < 230 to stop under symbols
    hand.setAttribute("y2", 300 + Math.sin(handRad)*200);
    hand.setAttribute("stroke","black");
    hand.setAttribute("stroke-width","6");
    svg.appendChild(hand);

    // Text label
const text = document.createElementNS(svgNS, "text");
text.setAttribute("x", "300");
text.setAttribute("y", "450");  // halfway between center (300) and bottom (600)
text.setAttribute("text-anchor", "middle");
text.setAttribute("dominant-baseline", "middle");
text.setAttribute("font-family", "sans-serif");
text.setAttribute("font-size", "36");
text.setAttribute("font-weight", "bold");
text.setAttribute("fill", "black");
text.textContent = "CTRL-P";
svg.appendChild(text);

    container.appendChild(svg);
  }

  function scheduleUpdate() {
    createSVG();
    requestAnimationFrame(scheduleUpdate);
  }

  document.addEventListener("DOMContentLoaded", scheduleUpdate);

})();



