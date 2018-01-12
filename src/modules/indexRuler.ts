import Ruler from "./ruler";

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

export default IndexRuler;
