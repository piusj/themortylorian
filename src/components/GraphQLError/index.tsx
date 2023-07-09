import { Box } from '@chakra-ui/react';

export default function GraphQLError({ error }) {
  console.error({ error });

  if ((error.networkError?.statusCode === 401))
    return (
      <Wrapper>
        {error.networkError.result.errors.map((err) => (
          <Item key={err.message}>
            {err.message} ({err.extensions.code})
          </Item>
        ))}
      </Wrapper>
    );

  return <Wrapper>{error.message}</Wrapper>;
}

const Wrapper = ({ children }) => (
  <Box p={6} sx={{ color: 'red' }}>
    {children}
  </Box>
);


const Item = ({ children }) => (
  <Box mb={2}>
    {children}
  </Box>
);
