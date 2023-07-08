import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { GraphQLError } from 'graphql';

export default async ({ request }) => {
  const session = await getServerSession(authOptions);
  const authToken = request.headers.get('Authorization');

  if (authToken && authToken === `Bearer ${session?.accessToken}`)
    return {
      session,
    };

  throw new GraphQLError('User is not authenticated', {
    extensions: {
      code: 'UNAUTHENTICATED',
      http: { status: 401 },
    },
  });
};
