import "./index.scss";

import slideIn from "./modules/animator";
import calculate from "./modules/calculator";
import IndexRuler from "./modules/indexRuler";
import Ruler from "./modules/ruler";

import * as background from "./assets/background.png";
import * as triangle from "./assets/triangle.png";

// Load images
const triangleTexture = document.createElement("img");
triangleTexture.src = triangle;
triangleTexture.id = "triangle";
document.body.appendChild(triangleTexture);

const backgroundTexture = document.createElement("img");
backgroundTexture.src = background;
backgroundTexture.id = "background";
document.body.appendChild(backgroundTexture);

window.addEventListener("DOMContentLoaded", () => {

  // Render rulers onto offscreen canvas to increase performance
  const offscreen = document.createElement("canvas");
  offscreen.width = 90 * 11;
  offscreen.height = 930;
  const offCtx = offscreen.getContext("2d");

  const rulers: Ruler[] = [];
  const indexRuler = new IndexRuler();
  window.addEventListener("load", () => {
    indexRuler.render(offCtx, 0, 0);
    rulers.push(indexRuler);

    // Generate and render rulers
    for (let i = 0; i <= 9; i++) {
      const ruler = new Ruler(i);
      ruler.render(offCtx, 90 + i * 90, 0);
      rulers.push(ruler);
    }
  });

  // Get canvas and context
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  document.getElementById("calculate").addEventListener("click", () => {
    calculate(
      (document.getElementById("number") as HTMLInputElement).value,
      parseInt((document.getElementById("multiplier") as HTMLInputElement).value, 10),
      ctx,
      offscreen,
    );
  });
});
