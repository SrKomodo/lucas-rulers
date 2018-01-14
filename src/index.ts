// Magic service worker stuff
(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }
})();

import "./index.scss";

import animate from "./modules/animator";
import { calculate } from "./modules/calculator";
import { IndexRuler, Ruler } from "./modules/ruler";

import * as textureFile from "./assets/rulers.png";

window.addEventListener("DOMContentLoaded", () => {
  // Get canvas and context
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  // Get textures
  const textures = new Image();
  textures.src = textureFile;

  // Get elements
  const numberInput = document.getElementById("number") as HTMLInputElement;
  const multiplierInput = document.getElementById("multiplier") as HTMLInputElement;
  const calculateButton = document.getElementById("calculate") as HTMLAnchorElement;
  const output = document.getElementById("output") as HTMLSpanElement;

  // Wait for textures to load
  textures.addEventListener("load", () => {
    // When you click calculate
    calculateButton.addEventListener("click", () => {

      // Validate data
      if (!numberInput.checkValidity() || !multiplierInput.checkValidity()) {
        return;
      }

      const rulers: Ruler[] = [];
      rulers.push(new IndexRuler());
      for (const digit of numberInput.value.split("")) {
        rulers.push(new Ruler(parseInt(digit, 10)));
      }

      // Calculate the result
      const result = calculate(rulers, parseInt(multiplierInput.value, 10));

      // Show the result
      output.innerText = result.numbers.reverse().join("");

      // Render the animation
      animate(rulers, result.path, ctx, textures);
    });
  });
});
