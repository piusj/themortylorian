import { GraphQLContext } from '@/lib/graphql/context';
import { highscores } from '@/domain/highscores';
import {getMe} from "@/domain/authentication";
import {getUsers} from "@/domain/users";

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

      return highscores(prisma);
    },
  },
};
