export const getRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

export const generateXUniqueNumbers = (x: number, generator: () => number) => {
  const set = new Set<number>();

  while (set.size < x) {
    set.add(generator());
  }

  return Array.from(set);
};

export const shuffleArray = <T>(array: T[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
