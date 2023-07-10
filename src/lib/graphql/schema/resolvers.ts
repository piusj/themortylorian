import { GraphQLContext } from '@/lib/graphql/context';
import { getHighScores } from '@/lib/prisma/highscores';
import { getMe, getUsers, updateUser } from '@/lib/prisma/user';

export default {
  Query: {
    me: (_, _variables, context: GraphQLContext) => {
      const { prisma, user } = context;

      return getMe(prisma, user);
    },
    users: (_, _variables, context: GraphQLContext) => {
      const { prisma } = context;

      return getUsers(prisma);
    },
    highscores: (_, _variables, context: GraphQLContext) => {
      const { prisma } = context;

      return getHighScores(prisma);
    },
  },
  Mutation: {
    putUser: async (_, variables, context: GraphQLContext) => {
      const { prisma, user } = context;

      return await updateUser(prisma, {
        ...user,
        ...variables,
      });
    },
  },
};
