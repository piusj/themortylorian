import { generateXUniqueNumbers, getRandomNumberBetween, shuffleArray } from '@/lib/maths';

describe('maths module', () => {
  describe('getRandomNumberBetween', () => {
    describe('getRandomNumberBetween(10, 100)', () => {
      test('generates a number type', () => {
        const rando = getRandomNumberBetween(10, 100);
        expect(typeof rando).toBe('number');
      });

      test('generates a number between 10 and 100', () => {
        const rando = getRandomNumberBetween(10, 100);
        expect(rando).toBeGreaterThanOrEqual(10);
        expect(rando).toBeLessThanOrEqual(100);
      });
    });

    describe('succeeds generating many random numbers', () => {
      const cases = Array.from(Array(100).keys()).map((x) => [
        1,
        Math.floor(Math.random() * x + 1),
      ]);
      test.each(cases)('given %p and %p as arguments', (min, max) => {
        const rando = getRandomNumberBetween(min, max);
        expect(rando).toBeGreaterThanOrEqual(min);
        expect(rando).toBeLessThanOrEqual(max);
      });
    });

    describe('getRandomNumberBetween(0, 5) run 100 times', () => {
      const tries = Array.from(Array(100).keys());
      test(' returns min value at least once', () => {
        const results = tries.map(() => getRandomNumberBetween(0, 5));
        console.log(results);
        expect(results.includes(0)).toBeTruthy();
      });

      test(' returns max value at least once', () => {
        const results = tries.map(() => getRandomNumberBetween(0, 5));
        console.log(results);
        expect(results.includes(5)).toBeTruthy();
      });
    });
  });

  describe('es6 sets', () => {
    test('adding 5 unique numbers gives size of 5', () => {
      const numSet = new Set<number>();
      numSet.add(1).add(2).add(3).add(4).add(5);
      expect(numSet.size).toBe(5);
    });

    test('adding duplicate numbers dont change the size', () => {
      const numSet = new Set<number>();
      numSet.add(1).add(2).add(3).add(4).add(5).add(3);
      expect(numSet.size).toBe(5);

      numSet.add(1).add(2).add(3).add(4).add(5);
      expect(numSet.size).toBe(5);
    });

    test('converts to an array', () => {
      const numSet = new Set<number>();
      numSet.add(1).add(2).add(3).add(4).add(5);

      expect(Array.from(numSet)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('generateXUniqueNumbers', () => {
    describe('with generator getRandomNumberBetween(1, 1000)', () => {
      describe('for 10 numbers', () => {
        const generator = () => getRandomNumberBetween(1, 1000);
        const result = generateXUniqueNumbers(10, generator);

        test('gives array of 10 numbers', () => {
          expect(result.length).toBe(10);
        });

        test.each(result)('result %p is between 1 and 1000', (x) => {
          expect(x).toBeGreaterThanOrEqual(1);
          expect(x).toBeLessThanOrEqual(1000);
        });
      });
    });
  });

  describe('shuffleArray', () => {
    describe('shuffling an array of numbers', () => {
      test('reorders the array in place', () => {
        const arr = [1, 2, 3, 4, 5];
        shuffleArray<number>(arr);
        expect(arr).not.toEqual([1, 2, 3, 4, 5]);
      });
    });
  });
});
