import { GraphQLContext } from '@/lib/graphql/context';
import { recordGameResult } from '@/lib/prisma/game';
import { getHighScores } from '@/lib/prisma/highscores';
import { getMe, getUsers, updateUser } from '@/lib/prisma/user';
import { PutGameResultMutationVariables, PutUserMutationVariables } from '@/types/graphql';

type QueryResolver = (context: GraphQLContext) => any;
type MutationResolver = (variables: never, context: GraphQLContext) => any;

const queryResolver = (resolver: QueryResolver) => (_: never, __: never, context: GraphQLContext) =>
  resolver(context);

const mutationResolver =
  (resolver: MutationResolver) => (_: never, variables: never, context: GraphQLContext) =>
    resolver(variables, context);

const resolvers = {
  Query: {
    me: queryResolver((context) => {
      const { prisma, user } = context;

      return getMe(prisma, user);
    }),
    users: queryResolver((context) => {
      const { prisma } = context;

      return getUsers(prisma);
    }),
    highscores: queryResolver((context) => {
      const { prisma } = context;

      return getHighScores(prisma);
    }),
  },
  Mutation: {
    putUser: mutationResolver((variables: PutUserMutationVariables, context: GraphQLContext) => {
      const { prisma, user } = context;

      return updateUser(prisma, user.id, {
        ...variables,
      });
    }),
    putGameResult: mutationResolver(
      (variables: PutGameResultMutationVariables, context: GraphQLContext) => {
        const { prisma, user } = context;
        const { isCorrect } = variables;

        return recordGameResult(prisma, user.id, isCorrect);
      },
    ),
  },
};

export default resolvers;
