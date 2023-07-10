import { GraphQLContext } from '@/lib/graphql/context';
import { getHighscores } from '@/domain/getHighscores';
import { getMe } from '@/domain/authentication';
import { getUsers, putUser } from '@/domain/getUserByEmail';

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
    highscores: (_, _args, context: GraphQLContext) => {
      const { prisma } = context;

      return getHighscores(prisma);
    },
  },
  Mutation: {
    putUser: async (_, args, context: GraphQLContext) => {
      const { prisma, user } = context;

      return await putUser(prisma, {
        ...user,
        ...args,
      });
    },
  },
};
