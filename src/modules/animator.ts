import { PathSegment } from "./calculator";
import { Ruler } from "./ruler";

/**
 * Renders a set of rulers
 * @param rulers The indexes of the rulers to render
 * @param t Progress of the animation
 * @param ctx Context to render to
 * @param textures Texture image
 */
function drawRulers(rulers: number[], t: number, ctx: CanvasRenderingContext2D, textures: HTMLImageElement) {
  for (let i = 0; i < rulers.length; i++) {
    const ruler = rulers[i];
    const rulerT = 1 - Math.pow(1 - Math.max(Math.min(t * rulers.length - i, 1), 0), 2);
    const x = (1 - rulerT) * ctx.canvas.width + rulerT * i * 90;
    ctx.drawImage(textures, (ruler + 1) * 90, 0, 90, 930, x, 0, 90, 930);
  }
}

/**
 * Renders a path
 * @param path Path segments to render
 * @param ctx Context to render to
 * @param t Progress of the animation
 */
function drawPath(path: PathSegment[], ctx: CanvasRenderingContext2D, t: number) {
  ctx.strokeStyle = "rgba(255, 0, 0, .8)";
  ctx.lineWidth = 2;

  t = Math.max(0, t - 1);

  ctx.beginPath();
  for (let i = 0; i < path.length; i++) {
    const segment = path[i];
    const segmentT = 1 - Math.pow(1 - Math.max(Math.min(t * path.length - i, 1), 0), 2);

    const cutoffX = (1 - segmentT) * segment.x1 + segmentT * segment.x2;
    const cutoffY = (1 - segmentT) * segment.y1 + segmentT * segment.y2;

    if (segmentT > 0) {
      ctx.moveTo(segment.x1, segment.y1);
      ctx.lineTo(cutoffX, cutoffY);
    }
  }
  ctx.stroke();
}

/**
 * Animates a multiplication
 * @param rulers Array of rulers to animate
 * @param ctx Context to render to
 * @param textures Image with all the ruler textures
 */
function animate(rulers: Ruler[], path: PathSegment[], ctx: CanvasRenderingContext2D, textures: HTMLImageElement) {
  ctx.canvas.width = rulers.length * 90;

  let t = 0;

  function render() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawRulers(rulers.map((ruler) => ruler.digit), t, ctx, textures);
    drawPath(path, ctx, t);
  }

  function iterate() {
    render();
    // Update time, assuming its running at the 60fps animation will take two seconds
    t += 1 / 60;
    if (t >= 2) {
      t = 2;
      render();
      return;
    } else {
      requestAnimationFrame(iterate);
    }
  }

  iterate();
}

export default animate;
