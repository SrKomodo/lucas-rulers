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
      start: window.innerWidth,
      end: index * 90,
    };
  });

  const speed = 100;
  let i = 0;

  function draw() {
    if (animations[i].progress >= 1) {
      animations[i].progress = 1;
      i++;
    }
    animations[i].progress += 1 / speed;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const anim of animations) {
      const x = Math.abs(anim.end * anim.progress - anim.start * (1 - anim.progress));
      ctx.drawImage(offscreen, anim.i * 90, 0, 90, 930, x, 0, 90, 930);
    }

    if (i < animations.length) {
      requestAnimationFrame(draw);
    }
  }

  requestAnimationFrame(draw);
}

export default slideIn;
