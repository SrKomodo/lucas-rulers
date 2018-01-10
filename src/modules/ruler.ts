class Ruler {
  protected numbers: number[][];

  constructor(digit: number) {
    this.numbers = [];
    for (let i = 1; i <= 9; i++) {
      const nums = [];
      for (let j = 0; j < i; j++) {
        nums.push((i * digit + j) % 10);
      }
      this.numbers.push(nums);
    }
    console.log(this.numbers);
  }
}

export default Ruler;
