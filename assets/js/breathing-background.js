(function () {
  const container = document.getElementById("breathing-bg");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!container || typeof window.p5 === "undefined") {
    if (container) container.classList.add("is-static");
    return;
  }

  new window.p5((p) => {
    let resizeObserver;

    function size() {
      const rect = container.getBoundingClientRect();
      return {
        width: Math.max(320, Math.floor(rect.width || window.innerWidth)),
        height: Math.max(420, Math.floor(rect.height || window.innerHeight)),
      };
    }

    function drawPattern(time) {
      const mobile = p.width < 720;
      const numLines = mobile ? 40 : 72;
      const numPoints = mobile ? 112 : 180;
      const verticalSpan = p.height / (mobile ? 2.15 : 2.35);

      p.clear();
      p.translate(p.width / 2, p.height / 2);
      p.noFill();

      for (let i = 0; i < numLines; i += 1) {
        const linePhase = (i / numLines) * p.TWO_PI;
        const primaryAlpha = mobile ? 60 : 55;
        const accentAlpha = mobile ? 40 : 35;
        p.stroke(i % 5 === 0 ? p.color(184, 167, 131, accentAlpha) : p.color(77, 111, 115, primaryAlpha));
        p.strokeWeight(i % 7 === 0 ? 1.8 : 1.1);

        [-1, 1].forEach((side) => {
          p.beginShape();
          for (let j = 0; j <= numPoints; j += 1) {
            const pointPhase = j / numPoints;
            const y = p.map(pointPhase, 0, 1, -verticalSpan, verticalSpan);
            const envelope = p.sin(pointPhase * p.PI);
            const wave1 = p.sin(time + linePhase) * (mobile ? 42 : 68);
            const wave2 = p.sin(pointPhase * 8 + time * 2) * (mobile ? 30 : 48);
            const centerComplexity = p.pow(p.cos(pointPhase * p.PI - p.HALF_PI), 2) * (mobile ? 64 : 110);
            const wave3 = p.cos(linePhase * 4 - time) * centerComplexity;
            const x = envelope * (wave1 + wave2 + wave3 + (mobile ? 46 : 70));
            p.vertex(side * x, y);
          }
          p.endShape();
        });
      }
    }

    p.setup = () => {
      const nextSize = size();
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 1.5));
      p.createCanvas(nextSize.width, nextSize.height);

      if (reduceMotion) {
        drawPattern(1.4);
        p.noLoop();
        return;
      }

      resizeObserver = new ResizeObserver(() => {
        const updated = size();
        p.resizeCanvas(updated.width, updated.height);
      });
      resizeObserver.observe(container);
    };

    p.draw = () => {
      drawPattern(p.frameCount * 0.008);
    };

    p.windowResized = () => {
      const updated = size();
      p.resizeCanvas(updated.width, updated.height);
      if (reduceMotion) drawPattern(1.4);
    };

    window.addEventListener("beforeunload", () => {
      if (resizeObserver) resizeObserver.disconnect();
    });
  }, container);
})();
