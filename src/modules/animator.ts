import {IndexRuler, Ruler} from "./ruler";

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

/**
 * Calculates and animates a multiplication
 * @param n Number to multiply
 * @param multiplier Multiplier
 * @param ctx Canvas to render the animation to
 * @param textures Image with all the ruler textures
 */
function animate(n: string, multiplier: number, ctx: CanvasRenderingContext2D, textures: HTMLImageElement) {
  const rulers: Ruler[] = [];
  rulers.push(new IndexRuler());
  for (const digit of n.split("")) {
    rulers.push(new Ruler(parseInt(digit, 10)));
  }

  ctx.canvas.width = rulers.length * 90;

  let t = 0;

  function render() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawRulers(rulers.map((ruler) => ruler.digit), t, ctx, textures);
  }

  function iterate() {
    render();
    // Update time, assuming its running at the 60fps animation will take two seconds
    t += 1 / 60;
    if (t >= 1) {
      t = 1;
      render();
      return;
    } else {
      requestAnimationFrame(iterate);
    }
  }

  iterate();
}

export default animate;
