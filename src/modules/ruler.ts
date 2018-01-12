class Ruler {
  public digit: number;
  protected numbers: number[][];
  protected triangles: number[][]; // [start, end, result]

  constructor(digit: number) {
    this.digit = digit;
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
      header height  = 30;
      digit height   = 20;
      digit width    = 40;
      triangle width = 50;
      total height   = 900;
    */

    let rowI = 0;
    let digitI = 0;

    // Setup default styles
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw background
    ctx.drawImage(document.getElementById("background") as HTMLImageElement, x, y);

    // Draw header
    ctx.fillStyle = ctx.createPattern(document.getElementById("triangle") as HTMLImageElement, "repeat");
    ctx.fillText(this.digit.toString(), x + 45, y + 15);

    y += 30; // Offset everything else so they dont mess with the header

    // Store all i can in paths to bundle draw calls together
    const triangles = new Path2D();

    for (const row of this.numbers) {
      // Generate triangles
      for (const triangle of this.triangles[rowI]) {
        triangles.moveTo(x + 50, y + digitI * 20 + triangle[0] * 20);
        triangles.lineTo(x + 50, y + digitI * 20 + triangle[1] * 20 + 20);
        triangles.lineTo(x, y + digitI * 20 + triangle[2] * 20 + 10);
        triangles.closePath();
      }

      // Draw digits
      for (const digit of row) {
        ctx.fillText(digit.toString(), x + 70, y + digitI * 20 + 10);
        digitI++;
      }
      rowI++;
    }

    // Draw triangles
    (ctx.fill as (fillRule: string | Path2D) => void)(triangles); // Small hack to please typescript
  }
}

export default Ruler;
