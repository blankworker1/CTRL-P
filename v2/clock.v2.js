l9loo(function () {

  const EPOCH = Date.parse("2026-03-03T00:00:00Z");
  const TOTAL_HOURS = 720; // 30 days
  const DEGREES_PER_HOUR = 360 / TOTAL_HOURS;

  // Compute angle of hand
  function getRotationAngle() {
    const now = Date.now();
    const elapsedHours = ((now - EPOCH) / (1000*60*60)) % TOTAL_HOURS;
    const normalized = (elapsedHours + TOTAL_HOURS) % TOTAL_HOURS;
    return normalized * DEGREES_PER_HOUR;
  }

  function createSVG() {
    const container = document.getElementById("clock");
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

  
// Major symbols (5) — correct order, no mask needed
const symbolOrder = [0, 2, 1, 4, 3];

for (let i = 0; i < 5; i++) {
  const angle = i * 72 - 90;  // 5 symbols
  const rad = angle * (Math.PI / 180);

  const group = document.createElementNS(svgNS, "g");
  group.setAttribute(
    "transform",
    `translate(${300 + Math.cos(rad) * 230}, ${300 + Math.sin(rad) * 230})`
  );

  const state = symbolOrder[i];

  // Rectangle (draw first)
  const rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("y", "-22");
  rect.setAttribute("height", "44");
  rect.setAttribute("fill", "black");

  switch (state) {
    case 0: rect.setAttribute("x","-22"); rect.setAttribute("width","44"); break; // full
    case 1: rect.setAttribute("x","-22"); rect.setAttribute("width","14"); break; // 1/3 left
    case 2: rect.setAttribute("x","-22"); rect.setAttribute("width","28"); break; // 2/3 left
    case 3: rect.setAttribute("x","-22"); rect.setAttribute("width","28"); break; // 2/3 right
    case 4: rect.setAttribute("x","-10"); rect.setAttribute("width","14"); break; // 1/3 right
  }

  group.appendChild(rect);

  // Circle (draw on top to mask edges)
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", "0");
  circle.setAttribute("cy", "0");
  circle.setAttribute("r", "22");
  circle.setAttribute("fill", "white");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("stroke-width", "2");
  group.appendChild(circle);

  svg.appendChild(group);
}

    
    // Hand
    const handAngle = getRotationAngle() - 90;
    const handRad = handAngle*(Math.PI/180);
    const hand = document.createElementNS(svgNS, "line");
    hand.setAttribute("x1","300");
    hand.setAttribute("y1","300");
    hand.setAttribute("x2", 300+Math.cos(handRad)*240);
    hand.setAttribute("y2", 300+Math.sin(handRad)*240);
    hand.setAttribute("stroke","black");
    hand.setAttribute("stroke-width","6");
    svg.appendChild(hand);

    container.appendChild(svg);
  }

  function scheduleUpdate() {
    createSVG();
    requestAnimationFrame(scheduleUpdate);
  }

  document.addEventListener("DOMContentLoaded", scheduleUpdate);

})();
