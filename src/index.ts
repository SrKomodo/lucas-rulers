import "./index.scss";

import slideIn from "./modules/animator";
import IndexRuler from "./modules/indexRuler";
import Ruler from "./modules/ruler";

document.addEventListener("DOMContentLoaded", () => {
  // Render rulers onto offscreen canvas to increase performance
  const offscreen = document.createElement("canvas");
  offscreen.width = 90 * 11;
  offscreen.height = 930;
  const offCtx = offscreen.getContext("2d");

  const rulers: Ruler[] = [];

  // We render the indexRuler in the extra spot
  const indexRuler = new IndexRuler();
  indexRuler.render(offCtx, 0, 0);
  rulers.push(indexRuler);

  // Generate and render rulers
  for (let i = 0; i <= 9; i++) {
    const ruler = new Ruler(i);
    ruler.render(offCtx, 90 + i * 90, 0);
    rulers.push(ruler);
  }

  // Get canvas and context
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  slideIn(ctx, rulers, offscreen);
});
