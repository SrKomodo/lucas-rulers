import { IndexRuler, Ruler } from "./ruler";

interface SolvePath {
  numbers: number[];
  path: PathSegment[];
}

interface PathSegment {
  x1: number;
  y1: number;

  x2: number;
  y2: number;
}

function height(i: number) {
  if (i === -1) {
    return 0;
  }
  return i * 20 + height(i - 1);
}

/**
 * Calculates the result of a multiplication and the path to render
 * @param rulers The rulers to calculate
 * @param multiplier The multiplier to use
 */
function calculate(rulers: Ruler[], multiplier: number): SolvePath {
  const numbers: number[] = [];
  const path: PathSegment[] = [];

  let target = 0;
  for (let i = rulers.length - 1; i >= 0; i--) {

    const ruler = rulers[i];
    const num = ruler.numbers[multiplier - 1][target];

    const firstHeight = 30 + height(multiplier - 1) + target * 20 + 10;

    if (i !== 0) {
      path.push({
        x1: i * 90 + 60,
        y1: firstHeight,
        x2: i * 90 + 50,
        y2: firstHeight,
      });

      const segment = {
        x1: i * 90 + 50,
        y1: firstHeight,
        x2: i * 90,
      };

      for (const triangle of ruler.triangles[multiplier - 1]) {
        if (target >= triangle[0] && target <= triangle[1]) {
          target = triangle[2];
          break;
        }
      }
      const secondHeight = 30 + height(multiplier - 1) + target * 20 + 10
      path.push({
        ...segment,
        y2: secondHeight,
      });

      path.push({
        x1: i * 90,
        y1: secondHeight,
        x2: i * 90 - 10,
        y2: secondHeight,
      });
    }

    numbers.push(num);
  }

  return {
    numbers,
    path,
  };
}

export {calculate, SolvePath, PathSegment};
