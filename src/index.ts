import "./index.scss";

import calculate from "./modules/calculator";
import IndexRuler from "./modules/indexRuler";
import Ruler from "./modules/ruler";

import * as textureFile from "./assets/rulers.png";

window.addEventListener("DOMContentLoaded", () => {
  // Get canvas and context
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  // Get textures
  const textures = new Image();
  textures.src = textureFile;

  // Get inputs
  const numberInput = (document.getElementById("number") as HTMLInputElement);
  const multiplierInput = (document.getElementById("multiplier") as HTMLInputElement);

  // Wait for textures to load
  textures.addEventListener("load", () => {
    // When you click calculate
    document.getElementById("calculate").addEventListener("click", () => {
      // Calculate and render the animation
      calculate(numberInput.value, parseInt(multiplierInput.value, 10), ctx, textures);
    });
  });
});
