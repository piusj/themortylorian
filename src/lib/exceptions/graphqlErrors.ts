import {GraphQLError} from "graphql";

export function throwNotAuthenticatedError() {
  throw new GraphQLError(
    'User is not authenticated',
    null,
    null,
    null,
    null,
    null,
    {
      code: 'UNAUTHENTICATED',
      http: { status: 401 },
    }
  );
}