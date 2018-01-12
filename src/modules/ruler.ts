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
}

export default Ruler;
