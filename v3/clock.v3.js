
(function () {

  const EPOCH = Date.parse("2026-03-03T00:00:00Z");
  const TOTAL_HOURS = 720; // 30 days
  const DEGREES_PER_HOUR = 360 / TOTAL_HOURS;

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

    // Outer dial (black fill, white stroke)
    const outer = document.createElementNS(svgNS, "circle");
    outer.setAttribute("cx", "300");
    outer.setAttribute("cy", "300");
    outer.setAttribute("r", "280");
    outer.setAttribute("fill", "black");
    outer.setAttribute("stroke", "white");
    outer.setAttribute("stroke-width", "8");
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
      line.setAttribute("stroke", "white");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);
    }

    // Major symbols (5)
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

      let rectX, rectWidth;

      switch (state) {
        case 0: rectX = -circleR; rectWidth = 44; break;   // full
        case 1: rectX = -circleR; rectWidth = 14; break;   // 1/3 left
        case 2: rectX = -circleR; rectWidth = 28; break;   // 2/3 left
        case 3: rectX = -28;      rectWidth = 28; break;   // 2/3 right
        case 4: rectX = 8;        rectWidth = 14; break;   // 1/3 right
      }

      // White block (night inversion)
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", rectX);
      rect.setAttribute("y", -circleR);
      rect.setAttribute("width", rectWidth);
      rect.setAttribute("height", 44);
      rect.setAttribute("fill", "white");
      group.appendChild(rect);

      // Black circle on top with white stroke
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", 0);
      circle.setAttribute("cy", 0);
      circle.setAttribute("r", circleR);
      circle.setAttribute("fill", "black");
      circle.setAttribute("stroke", "white");
      circle.setAttribute("stroke-width", 2);
      group.appendChild(circle);

      svg.appendChild(group);
    }

    // Tapered white hand
    const handAngle = getRotationAngle() - 90;
    const handRad = handAngle * (Math.PI/180);
    const handLength = 200;
    const baseWidth = 10;
    const tipWidth = 2;

    const xTip = 300 + Math.cos(handRad) * handLength;
    const yTip = 300 + Math.sin(handRad) * handLength;
    const perpRad = handRad + Math.PI / 2;

    const xBaseLeft  = 300 + Math.cos(perpRad) * (baseWidth/2);
    const yBaseLeft  = 300 + Math.sin(perpRad) * (baseWidth/2);
    const xBaseRight = 300 - Math.cos(perpRad) * (baseWidth/2);
    const yBaseRight = 300 - Math.sin(perpRad) * (baseWidth/2);
    const xTipLeft   = xTip + Math.cos(perpRad) * (tipWidth/2);
    const yTipLeft   = yTip + Math.sin(perpRad) * (tipWidth/2);
    const xTipRight  = xTip - Math.cos(perpRad) * (tipWidth/2);
    const yTipRight  = yTip - Math.sin(perpRad) * (tipWidth/2);

    const hand = document.createElementNS(svgNS, "polygon");
    hand.setAttribute("points", `
      ${xBaseLeft},${yBaseLeft}
      ${xTipLeft},${yTipLeft}
      ${xTipRight},${yTipRight}
      ${xBaseRight},${yBaseRight}
    `);
    hand.setAttribute("fill", "white");
    svg.appendChild(hand);

    // Center pivot
    const pivot = document.createElementNS(svgNS, "circle");
    pivot.setAttribute("cx", "300");
    pivot.setAttribute("cy", "300");
    pivot.setAttribute("r", "8");
    pivot.setAttribute("fill", "white");
    svg.appendChild(pivot);

    container.appendChild(svg);
  }

  function scheduleUpdate() {
    createSVG();
    requestAnimationFrame(scheduleUpdate);
  }

  document.addEventListener("DOMContentLoaded", scheduleUpdate);

})();
