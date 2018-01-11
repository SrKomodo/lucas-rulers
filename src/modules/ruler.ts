class Ruler {
  protected numbers: number[][];
  protected triangles: number[][]; // [start, end, result]

  constructor(digit: number) {
    this.numbers = [];
    this.triangles = [];

    for (let i = 1; i <= 9; i++) {     // Iterate over each row in the ruler
      const row = [];
      const rowTriangles = [];

      let num = digit * i;             // First number in row
      let lastCarry;                   // Name is self-explanatory
      let trigI = 0;                   // Current triangle index (Could be removed)
      rowTriangles.push([0]);          // Add starting triangle vertex

      for (let j = 0; j < i; j++) {    // For each number in the row
        if (num >= 10) {                                 // If we carry 2 digits
          const carry = parseInt(num.toString()[0], 10); // Get the carried digit
          if (typeof lastCarry === "undefined") {                              // If this is the first carry
            lastCarry = carry;                           // Set this carry as first
          } else if (carry !== lastCarry) {              // If we are at a new carry
            rowTriangles[trigI].push(j - 1, lastCarry);  // Close the current triangle
            rowTriangles.push([j]); trigI++;             // Create a new one
            lastCarry = carry;                           // And set the new carry
          }
        } else if (j === 0) { // If there was no carry on the first number
          lastCarry = 0;      // Then we set it to 0
        }
        row.push(num % 10); // Add number remainder to row
        num++;              // And bump up the number
      }

      rowTriangles[trigI].push(i - 1, lastCarry); // Close last triangle

      this.triangles.push(rowTriangles);
      this.numbers.push(row);
    }
  }

  public render(ctx: CanvasRenderingContext2D, x: number, y: number) {

    /*
      digit height   = 20;
      digit width    = 40;
      triangle width = 50;
      total height   = 900;
    */

    let rowI = 0;
    let digitI = 0;

    // Setup default styles
    ctx.lineCap = "butt";
    ctx.lineJoin = "bevel";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "#221005";

    // Draw bakcground
    ctx.fillStyle = "#e7c592";
    ctx.beginPath();
    ctx.rect(x, y, 90, 900);
    ctx.fill();
    ctx.stroke();

    // Store all i can in paths to bundle draw calls together
    const triangles = new Path2D();
    const rows = new Path2D();

    for (const row of this.numbers) {
      // Generate triangles
      for (const triangle of this.triangles[rowI]) {
        triangles.moveTo(x + 50, y + digitI * 20 + triangle[0] * 20);
        triangles.lineTo(x + 50, y + digitI * 20 + triangle[1] * 20 + 20);
        triangles.lineTo(x, y + digitI * 20 + triangle[2] * 20 + 10);
        triangles.closePath();
      }
      // Draw digits
      ctx.fillStyle = "#221005";
      for (const digit of row) {
        ctx.fillText(digit.toString(), x + 70, y + digitI * 20 + 10);
        digitI++;
      }
      // Generate row separators
      if (digitI < 900) {
        rows.moveTo(x, y + digitI * 20);
        rows.lineTo(x + 90, y + digitI * 20);
      }
      rowI++;
    }

    // Draw triangles
    ctx.fillStyle = "#9c7761";
    (ctx.fill as (fillRule: string | Path2D) => void)(triangles); // Small hack to please typescript
    ctx.stroke(triangles);

    // Draw row separators
    ctx.stroke(rows);
  }
}

export default Ruler;
