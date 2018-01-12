import Ruler from "./ruler";

/**
 * @param rulers the indexes of the rulers you want to animate
 * @param t 0..1, progress of the animation
 * @param ctx context to render to
 * @param textures Texture image
 */
function drawRulers(rulers: number[], t: number, ctx: CanvasRenderingContext2D, textures: HTMLImageElement) {
  if (t >= 1) {
    for (let i = 0; i < rulers.length; i++) {
      const ruler = rulers[i];
      ctx.drawImage(textures, (ruler + 1) * 90, 0, 90, 930, i * 90, 0, 90, 930);
    }
  } else {
    for (let i = 0; i < rulers.length; i++) {
      const ruler = rulers[i];
      const rulerT = 1 - Math.pow(1 - Math.max(Math.min(t * rulers.length - i, 1), 0), 2);
      const x = (1 - rulerT) * ctx.canvas.width + rulerT * i * 90;
      ctx.drawImage(textures, (ruler + 1) * 90, 0, 90, 930, x, 0, 90, 930);
    }
  }
}

export {drawRulers};
