import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Character = {
  __typename?: 'Character';
  /** Time at which the character was created in the database. */
  created?: Maybe<Scalars['String']['output']>;
  /** Episodes in which this character appeared. */
  episode: Array<Maybe<Episode>>;
  /** The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
  gender?: Maybe<Scalars['String']['output']>;
  /** The id of the character. */
  id?: Maybe<Scalars['ID']['output']>;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image?: Maybe<Scalars['String']['output']>;
  /** The character's last known location */
  location?: Maybe<Location>;
  /** The name of the character. */
  name?: Maybe<Scalars['String']['output']>;
  /** The character's origin location */
  origin?: Maybe<Location>;
  /** The species of the character. */
  species?: Maybe<Scalars['String']['output']>;
  /** The status of the character ('Alive', 'Dead' or 'unknown'). */
  status?: Maybe<Scalars['String']['output']>;
  /** The type or subspecies of the character. */
  type?: Maybe<Scalars['String']['output']>;
};

export type Characters = {
  __typename?: 'Characters';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Character>>>;
};

export type Episode = {
  __typename?: 'Episode';
  /** The air date of the episode. */
  air_date?: Maybe<Scalars['String']['output']>;
  /** List of characters who have been seen in the episode. */
  characters: Array<Maybe<Character>>;
  /** Time at which the episode was created in the database. */
  created?: Maybe<Scalars['String']['output']>;
  /** The code of the episode. */
  episode?: Maybe<Scalars['String']['output']>;
  /** The id of the episode. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The name of the episode. */
  name?: Maybe<Scalars['String']['output']>;
};

export type Episodes = {
  __typename?: 'Episodes';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Episode>>>;
};

export type FilterCharacter = {
  gender?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  species?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type FilterEpisode = {
  episode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FilterLocation = {
  dimension?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Highscore = {
  __typename?: 'Highscore';
  id: Scalars['String']['output'];
  score: Scalars['Int']['output'];
  user: User;
};

export type Info = {
  __typename?: 'Info';
  /** The length of the response. */
  count?: Maybe<Scalars['Int']['output']>;
  /** Number of the next page (if it exists) */
  next?: Maybe<Scalars['Int']['output']>;
  /** The amount of pages. */
  pages?: Maybe<Scalars['Int']['output']>;
  /** Number of the previous page (if it exists) */
  prev?: Maybe<Scalars['Int']['output']>;
};

export type Location = {
  __typename?: 'Location';
  /** Time at which the location was created in the database. */
  created?: Maybe<Scalars['String']['output']>;
  /** The dimension in which the location is located. */
  dimension?: Maybe<Scalars['String']['output']>;
  /** The id of the location. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The name of the location. */
  name?: Maybe<Scalars['String']['output']>;
  /** List of characters who have been last seen in the location. */
  residents: Array<Maybe<Character>>;
  /** The type of the location. */
  type?: Maybe<Scalars['String']['output']>;
};

export type Locations = {
  __typename?: 'Locations';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Location>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  putGameResult: User;
  putUser: User;
};


export type MutationPutGameResultArgs = {
  isCorrect: Scalars['Boolean']['input'];
};


export type MutationPutUserArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a specific character by ID */
  character?: Maybe<Character>;
  /** Get the list of all characters */
  characters?: Maybe<Characters>;
  /** Get a list of characters selected by ids */
  charactersByIds?: Maybe<Array<Maybe<Character>>>;
  /** Get a specific episode by ID */
  episode?: Maybe<Episode>;
  /** Get the list of all episodes */
  episodes?: Maybe<Episodes>;
  /** Get a list of episodes selected by ids */
  episodesByIds?: Maybe<Array<Maybe<Episode>>>;
  highscores: Array<Maybe<Highscore>>;
  /** Get a specific locations by ID */
  location?: Maybe<Location>;
  /** Get the list of all locations */
  locations?: Maybe<Locations>;
  /** Get a list of locations selected by ids */
  locationsByIds?: Maybe<Array<Maybe<Location>>>;
  me: User;
  users: Array<Maybe<User>>;
};


export type QueryCharacterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<FilterCharacter>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCharactersByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryEpisodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEpisodesArgs = {
  filter?: InputMaybe<FilterEpisode>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEpisodesByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryLocationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLocationsArgs = {
  filter?: InputMaybe<FilterLocation>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLocationsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  currentStreak: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  highscores?: Maybe<Array<Maybe<Highscore>>>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type GetDataQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type GetDataQuery = { __typename?: 'Query', charactersByIds?: Array<{ __typename?: 'Character', id?: string | null, name?: string | null, species?: string | null, type?: string | null, gender?: string | null, created?: string | null, image?: string | null, episode: Array<{ __typename?: 'Episode', name?: string | null } | null> } | null> | null };

export type GetHighscoresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHighscoresQuery = { __typename?: 'Query', highscores: Array<{ __typename?: 'Highscore', id: string, score: number, user: { __typename?: 'User', username?: string | null, title?: string | null, image?: string | null } } | null> };

export type PutGameResultMutationVariables = Exact<{
  isCorrect: Scalars['Boolean']['input'];
}>;


export type PutGameResultMutation = { __typename?: 'Mutation', putGameResult: { __typename?: 'User', currentStreak: number, highscores?: Array<{ __typename?: 'Highscore', score: number } | null> | null } };

export type PutUserMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type PutUserMutation = { __typename?: 'Mutation', putUser: { __typename?: 'User', username?: string | null, title?: string | null } };


export const GetDataDocument = gql`
    query GetData($ids: [ID!]!) {
  charactersByIds(ids: $ids) {
    id
    name
    species
    type
    gender
    created
    image
    episode {
      name
    }
  }
}
    `;

/**
 * __useGetDataQuery__
 *
 * To run a query within a React component, call `useGetDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetDataQuery(baseOptions: Apollo.QueryHookOptions<GetDataQuery, GetDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataQuery, GetDataQueryVariables>(GetDataDocument, options);
      }
export function useGetDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataQuery, GetDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataQuery, GetDataQueryVariables>(GetDataDocument, options);
        }
export type GetDataQueryHookResult = ReturnType<typeof useGetDataQuery>;
export type GetDataLazyQueryHookResult = ReturnType<typeof useGetDataLazyQuery>;
export type GetDataQueryResult = Apollo.QueryResult<GetDataQuery, GetDataQueryVariables>;
export const GetHighscoresDocument = gql`
    query GetHighscores {
  highscores {
    id
    score
    user {
      username
      title
      image
    }
  }
}
    `;

/**
 * __useGetHighscoresQuery__
 *
 * To run a query within a React component, call `useGetHighscoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHighscoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHighscoresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHighscoresQuery(baseOptions?: Apollo.QueryHookOptions<GetHighscoresQuery, GetHighscoresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHighscoresQuery, GetHighscoresQueryVariables>(GetHighscoresDocument, options);
      }
export function useGetHighscoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHighscoresQuery, GetHighscoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHighscoresQuery, GetHighscoresQueryVariables>(GetHighscoresDocument, options);
        }
export type GetHighscoresQueryHookResult = ReturnType<typeof useGetHighscoresQuery>;
export type GetHighscoresLazyQueryHookResult = ReturnType<typeof useGetHighscoresLazyQuery>;
export type GetHighscoresQueryResult = Apollo.QueryResult<GetHighscoresQuery, GetHighscoresQueryVariables>;
export const PutGameResultDocument = gql`
    mutation PutGameResult($isCorrect: Boolean!) {
  putGameResult(isCorrect: $isCorrect) {
    currentStreak
    highscores {
      score
    }
  }
}
    `;
export type PutGameResultMutationFn = Apollo.MutationFunction<PutGameResultMutation, PutGameResultMutationVariables>;

/**
 * __usePutGameResultMutation__
 *
 * To run a mutation, you first call `usePutGameResultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutGameResultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putGameResultMutation, { data, loading, error }] = usePutGameResultMutation({
 *   variables: {
 *      isCorrect: // value for 'isCorrect'
 *   },
 * });
 */
export function usePutGameResultMutation(baseOptions?: Apollo.MutationHookOptions<PutGameResultMutation, PutGameResultMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PutGameResultMutation, PutGameResultMutationVariables>(PutGameResultDocument, options);
      }
export type PutGameResultMutationHookResult = ReturnType<typeof usePutGameResultMutation>;
export type PutGameResultMutationResult = Apollo.MutationResult<PutGameResultMutation>;
export type PutGameResultMutationOptions = Apollo.BaseMutationOptions<PutGameResultMutation, PutGameResultMutationVariables>;
export const PutUserDocument = gql`
    mutation PutUser($username: String, $title: String) {
  putUser(username: $username, title: $title) {
    username
    title
  }
}
    `;
export type PutUserMutationFn = Apollo.MutationFunction<PutUserMutation, PutUserMutationVariables>;

/**
 * __usePutUserMutation__
 *
 * To run a mutation, you first call `usePutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [putUserMutation, { data, loading, error }] = usePutUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      title: // value for 'title'
 *   },
 * });
 */
export function usePutUserMutation(baseOptions?: Apollo.MutationHookOptions<PutUserMutation, PutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PutUserMutation, PutUserMutationVariables>(PutUserDocument, options);
      }
export type PutUserMutationHookResult = ReturnType<typeof usePutUserMutation>;
export type PutUserMutationResult = Apollo.MutationResult<PutUserMutation>;
export type PutUserMutationOptions = Apollo.BaseMutationOptions<PutUserMutation, PutUserMutationVariables>;