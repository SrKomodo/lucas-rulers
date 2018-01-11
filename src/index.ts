import Ruler from "./modules/ruler";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  for (let i = 0; i <= 9; i++) {
    const ruler = new Ruler(i);
    ruler.render(ctx, 5 + i * 100, 5);
  }
});
