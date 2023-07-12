'use client';

import { ApolloError } from '@apollo/client';
import { generateXUniqueNumbers, getRandomNumberBetween, shuffleArray } from '@/lib/maths';
import { Character, GetDataQueryVariables, useGetDataQuery } from '@/types/graphql';

const CHARACTER_COUNT = 826;
const CHARACTER_POOL_SIZE = 10;
const ANSWER_CHOICES = 4;

type ScenarioData = {
  characters: Character[];
  spy: Character;
};

const generateScenario = (characters: Character[]) => {
  // Sometimes characters can have the same name or are duplicates,
  // so we want to make sure the names are unique.
  const uniqueCharacters: Character[] = [];
  characters.forEach((c) => {
    if (!uniqueCharacters.find(({ name }) => name == c.name)) uniqueCharacters.push(c);
  });

  // The api gives us characters in some order, so we want to shuffle them first to get varying options.
  shuffleArray(uniqueCharacters);

  // We want to put aside a character to be a "victim" that the "spy" steals the ID card from.
  const victim = uniqueCharacters.shift() as Character;
  // We want to show the user a limited amount of choices
  const choices = uniqueCharacters.splice(0, ANSWER_CHOICES);
  // Choose a spy at random
  const spyIndex = getRandomNumberBetween(0, choices.length - 1);
  // Steal information from victim but preserve id and image
  // The id will be used to identify the spy later
  const spy: Character = {
    ...choices[spyIndex],
  };
  choices[spyIndex] = {
    ...victim,
    id: spy.id as string,
    image: spy.image as string,
  };

  return {
    characters: choices,
    spy: spy,
  };
};

const getRandomCharacterIds = (size: number) => {
  const generator = () => getRandomNumberBetween(1, CHARACTER_COUNT);

  return generateXUniqueNumbers(size, generator).map(String);
};

const dataQueryVariables: GetDataQueryVariables = {
  ids: getRandomCharacterIds(CHARACTER_POOL_SIZE),
};

export const useGenerateScenario = (): {
  loading: boolean;
  error?: ApolloError;
  data?: ScenarioData;
} => {
  const { loading, error, data } = useGetDataQuery({ variables: dataQueryVariables });

  if (loading || error || !data?.charactersByIds) return { loading, error };

  return { loading, error, data: generateScenario(data.charactersByIds as Character[]) };
};
