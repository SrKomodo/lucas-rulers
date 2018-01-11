import "./index.scss";

import Ruler from "./modules/ruler";

document.addEventListener("DOMContentLoaded", () => {
  // Render rulers onto offscreen canvas to increase performance
  const offscreen = document.createElement("canvas");
  offscreen.width = 90 * 10;
  offscreen.height = 900;
  const offCtx = offscreen.getContext("2d");

  // Generate and render rulers
  const rulers: Ruler[] = [];
  for (let i = 0; i <= 9; i++) {
    const ruler = new Ruler(i);
    ruler.render(offCtx, i * 90, 0);
    rulers.push(ruler);
  }

  // Get canvas and context
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  // Set canvas size to screen size
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  // Calculate max separation between rulers
  const limit = (canvas.width - (90 * 9)) / 10 + 90;

  requestAnimationFrame(draw);
  let progress = 0;
  function draw() {
    // Clean screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render rulers
    for (let i = 0; i < 10; i++) {
      ctx.drawImage(offscreen, i * 90, 0, 90, 900, 10 + progress * i, 5, 90, 900);
      // ruler.render(ctx, 10 + progress * i, 5);
    }

    // Increase progress
    if (progress < limit) {
      progress++;
    }

    // Repeat
    requestAnimationFrame(draw);
  }
});
