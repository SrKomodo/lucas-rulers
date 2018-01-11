import Ruler from "./ruler";

interface AnimatedRuler {
  i: number;
  ruler: Ruler;
  progress: number;
  start: number;
  end: number;
}

function slideIn(ctx: CanvasRenderingContext2D, rulers: Ruler[], offscreen: HTMLCanvasElement) {
  const animations = rulers.map((ruler, index) => {
    return {
      i: index,
      ruler,
      progress: 0,
      start: ctx.canvas.width,
      end: index * 90,
    };
  });

  const speed = 50;
  let i = 0;

  function draw() {
    if (animations[i].progress >= 1) {
      animations[i].progress = 1;
      i++;
    } else {
      animations[i].progress += 1 / speed;
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const anim of animations) {
      const interpolation = 1 - Math.pow(1 - anim.progress, 2);
      const x = anim.start - (anim.start - anim.end) * interpolation;
      ctx.drawImage(offscreen, anim.i * 90, 0, 90, 930, x, 0, 90, 930);
    }

    if (i < animations.length) {
      requestAnimationFrame(draw);
    }
  }

  requestAnimationFrame(draw);
}

export default slideIn;
