import {drawRulers} from "./animator";
import IndexRuler from "./indexRuler";
import Ruler from "./ruler";

/**
 * Calculates and animates a multiplication
 * @param n Number to multiply
 * @param multiplier Multiplier
 * @param ctx Canvas to render the animation to
 * @param textures Image with all the ruler textures
 */
function calculate(n: string, multiplier: number, ctx: CanvasRenderingContext2D, textures: HTMLImageElement) {
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

export default calculate;
