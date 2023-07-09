import { GraphQLContext } from '@/lib/graphql/context';
import { getMe } from '@/domain/auth/getMe';
import { getUsers } from '@/domain/user/getUsers';
import { getHighscores } from '@/domain/highscores/getHighscores';

// const {
//   prisma,
//   user,
//   params: { query, operationName, variables },
// } = context;

export default {
  Query: {
    me: (_, _args, context: GraphQLContext) => {
      const { prisma, user } = context;

      return getMe(prisma, user);
    },
    users: (_, _args, context: GraphQLContext) => {
      const { prisma } = context;

      return getUsers(prisma);
    },
    highscores: async (_, _args, context: GraphQLContext) => {
      const { prisma } = context;

      return getHighscores(prisma);
    },
  },
};
