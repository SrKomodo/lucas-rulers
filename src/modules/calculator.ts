import slideIn from "./animator";
import IndexRuler from "./indexRuler";
import Ruler from "./ruler";

function calculate(n: string, multiplier: number, ctx: CanvasRenderingContext2D, textures: HTMLImageElement) {
  const rulers = [];
  rulers.push(new IndexRuler());
  for (const digit of n.split("")) {
    rulers.push(new Ruler(parseInt(digit, 10)));
  }
  ctx.canvas.width = rulers.length * 90;
  slideIn(ctx, rulers, textures);
}

export default calculate;
