import { Box } from '@chakra-ui/react';
import React from 'react';

export default function GraphQLError({ error }: { error: any }) {
  console.error({ error });

  if (error.networkError?.statusCode === 401)
    return (
      <Wrapper>
        {error.networkError.result.errors.map((err: any) => (
          <Item key={err.message}>
            {err.message} ({err.extensions.code})
          </Item>
        ))}
      </Wrapper>
    );

  return <Wrapper>{error.message}</Wrapper>;
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Box p={6} sx={{ color: 'red' }}>
    {children}
  </Box>
);

const Item = ({ children }: { children: React.ReactNode }) => <Box mb={2}>{children}</Box>;
