/** Represents a Ruler */
class Ruler {
  /** The digit the ruler represents */
  public digit: number;
  /**
   * Array of the numbers on the right side of the ruler.
   * Each item in the array is one of the rows, that contains the numbers that the row has
   */
  public numbers: number[][];
  /**
   * Array of all the triangles on the left side of the ruler.
   * Each triangle is an array of [Start number, End number, Number it points to]
   */
  public triangles: number[][][];

  /**
   * Creates a new Ruler
   * @param digit What digit the ruler is for
   */
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

/**
 * Represents the Index Ruler
 * All of the code is mostly the same as a normal 0 ruler,
 * but it has a digit of -1 to differentiate and it has no triangles
 */
class IndexRuler extends Ruler {
  /** Creates a new Index Ruler */
  constructor() {
    super(0); // Generate a 0 ruler
    this.triangles = []; // But we dont care about the triangles
    this.digit = -1; // And the index should be -1
  }
}

export {IndexRuler, Ruler};
