'use client';

import { generateXUniqueNumbers, getRandomNumberBetween } from '@/lib/maths';
import { Character, GetDataQueryVariables } from '@/types/graphql';

const CHARACTER_COUNT = 826;
const CHARACTER_POOL_SIZE = 10;
const ANSWER_CHOICES = 4;

const getRandomCharacterIds = (size: number) => {
  const generator = () => getRandomNumberBetween(1, CHARACTER_COUNT);

  return generateXUniqueNumbers(size, generator).map(String);
};

export const dataQueryVariables: GetDataQueryVariables = {
  ids: getRandomCharacterIds(CHARACTER_POOL_SIZE),
};

export const generateScenario = (characters: Character[]): [Character[], string] => {
  // Sometimes characters can have the same name or are duplicates,
  // so we want to make sure the names are unique.
  const uniqueCharacters: Character[] = [];
  characters.forEach((c) => {
    if (!uniqueCharacters.find(({ name }) => name == c.name)) uniqueCharacters.push(c);
  });

  // We want to put aside a character to be a "victim" that the "spy" steals the ID card from.
  const victim = uniqueCharacters.shift() as Character;
  // We want to show the user a limited amount of choices
  const choices = uniqueCharacters.splice(0, ANSWER_CHOICES);
  // Choose a spy at random
  const spyIndex = getRandomNumberBetween(0, choices.length - 1);
  // Steal information from victim but preserve id and image
  // The id will be used to identify the spy later
  const spyId = choices[spyIndex].id as string;
  const spyImage = choices[spyIndex].image as string;
  choices[spyIndex] = {
    ...victim,
    id: spyId,
    image: spyImage,
  };

  return [choices, spyId];
};
