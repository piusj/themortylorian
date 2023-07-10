import { GraphQLContext } from '@/lib/graphql/context';
import { getHighScores } from '@/lib/prisma/highscores';
import { getMe, getUsers, updateUser } from '@/lib/prisma/user';
import { PutUserMutationVariables } from '@/types/graphql';

type QueryResolver = (context: GraphQLContext) => any;
type MutationResolver = (variables: any, context: GraphQLContext) => any;

const queryResolver =
  (resolver: QueryResolver) => (_: undefined, __: {}, context: GraphQLContext) =>
    resolver(context);

const mutationResolver =
  (resolver: MutationResolver) => (_: undefined, variables: any, context: GraphQLContext) =>
    resolver(variables, context);

export default {
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

      return updateUser(prisma, {
        ...user,
        ...variables,
      });
    }),
  },
};
