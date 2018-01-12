import Ruler from "./ruler";

class IndexRuler extends Ruler {
  constructor() {
    super(0); // Generate a 0 ruler
    this.triangles = []; // But we dont care about the triangles
    this.digit = -1;
  }

  public render(ctx: CanvasRenderingContext2D, x: number, y: number) {
    /*
      This code is the same as the normal Ruler.render
      except for some differences that are documented in the code
    */
    let rowI = 0;
    let digitI = 0;

    ctx.lineCap = "butt";
    ctx.lineJoin = "bevel";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "#221005";

    ctx.fillStyle = "#e7c592";
    ctx.beginPath();
    ctx.rect(x, y, 90, 930);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#221005";
    ctx.fillText("Index", x + 45, y + 15); // Header says "Index" instead of the digit

    y += 30;
    const rows = new Path2D();

    for (const row of this.numbers) {
      rows.moveTo(x, y + digitI * 20);
      rows.lineTo(x + 90, y + digitI * 20);

      // Notice that there is no triangle code here

      ctx.fillText((rowI + 1).toString(10), x + 25, y + digitI * 20 + row.length / 2 * 20); // draw extra numbers
      for (const digit of row) {
        ctx.fillText(digit.toString(), x + 70, y + digitI * 20 + 10);
        digitI++;
      }
      rowI++;
    }

    // We draw an extra line because we have no triangles that draw it for us
    rows.moveTo(x + 50, y);
    rows.lineTo(x + 50, y + digitI * 20);

    ctx.stroke(rows);
  }
}

export default IndexRuler;
