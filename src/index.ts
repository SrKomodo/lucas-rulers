import "./index.scss";

import slideIn from "./modules/animator";
import calculate from "./modules/calculator";
import IndexRuler from "./modules/indexRuler";
import Ruler from "./modules/ruler";

import * as textureFile from "./assets/rulers.png";

window.addEventListener("DOMContentLoaded", () => {

  // Generate Rulers
  const rulers: Ruler[] = [new IndexRuler()];
  for (let i = 0; i <= 9; i++) {
    const ruler = new Ruler(i);
    rulers.push(ruler);
  }

  // Get canvas and context
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  // Get textures
  const textures = new Image();
  textures.src = textureFile;

  // Wait for textures to load
  textures.addEventListener("load", () => {
    document.getElementById("calculate").addEventListener("click", () => {
      calculate(
        (document.getElementById("number") as HTMLInputElement).value,
        parseInt((document.getElementById("multiplier") as HTMLInputElement).value, 10),
        ctx,
        textures,
      );
    });
  });
});
