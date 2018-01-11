const rowHeight = 20;
const digitWidth = 40;
const triangleWidth = 50;

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
    let rowI = 0;
    let digitI = 0;

    // Calculate height beforehand so i can draw the background first
    const height = this.numbers.map((value) => value.length).reduce((prev, curr) => prev + curr, 0);

    // Setup default styles
    ctx.lineCap = "butt";
    ctx.lineJoin = "bevel";
    ctx.lineWidth = 1.2;
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "#221005";

    // Draw bakcground
    ctx.fillStyle = "#e7c592";
    ctx.beginPath();
    ctx.rect(x, y, triangleWidth + digitWidth, height * rowHeight);
    ctx.fill();
    ctx.stroke();

    for (const row of this.numbers) {
      // Draw triangles
      ctx.fillStyle = "#9c7761";
      for (const triangle of this.triangles[rowI]) {
        ctx.beginPath();
        ctx.moveTo(x + triangleWidth, y + digitI * rowHeight + triangle[0] * rowHeight);
        ctx.lineTo(x + triangleWidth, y + digitI * rowHeight + triangle[1] * rowHeight + rowHeight);
        ctx.lineTo(x, y + digitI * rowHeight + triangle[2] * rowHeight + rowHeight / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      // Draw digits
      ctx.fillStyle = "#221005";
      for (const digit of row) {
        ctx.fillText(digit.toString(), x + triangleWidth + digitWidth / 2, y + digitI * rowHeight + rowHeight / 2);
        digitI++;
      }
      // Draw row separators
      if (digitI < height) {
        ctx.beginPath();
        ctx.moveTo(x, y + digitI * rowHeight);
        ctx.lineTo(x + triangleWidth + digitWidth, y + digitI * rowHeight);
        ctx.stroke();
      }
      rowI++;
    }
  }
}

export default Ruler;
