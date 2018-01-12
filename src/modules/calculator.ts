import slideIn from "./animator";
import IndexRuler from "./indexRuler";
import Ruler from "./ruler";

function calculate(n: string, multiplier: number, ctx: CanvasRenderingContext2D, offscreen: HTMLCanvasElement) {
  const rulers = [];
  rulers.push(new IndexRuler());
  for (const digit of n.split("")) {
    rulers.push(new Ruler(parseInt(digit, 10)));
  }
  slideIn(ctx, rulers, offscreen);
}

export default calculate;
