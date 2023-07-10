import { Box, Heading, Input } from '@chakra-ui/react';

export default function StepUsernameBody({ defaultValue, setUserName }) {
  function handleChange(e) {
    setUserName(e.target.value);
  }

  return (
    <Box>
      <Heading>What&apos;s your username?</Heading>

      <Box>
        <Input
          type="text"
          placeholder="xx_space_beth_xx"
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
