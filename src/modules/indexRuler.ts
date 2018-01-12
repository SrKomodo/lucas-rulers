import Ruler from "./ruler";

class IndexRuler extends Ruler {
  constructor() {
    super(0); // Generate a 0 ruler
    this.triangles = []; // But we dont care about the triangles
    this.digit = -1;
  }
}

export default IndexRuler;
