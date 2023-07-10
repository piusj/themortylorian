import {Box, Heading, Input} from "@chakra-ui/react";

export default function StepUsernameBody() {
  return (
    <Box>
      <Heading>What&apos;s your username?</Heading>

      <Box>
        <Input type="text" placeholder="xx_space_beth_xx" />
      </Box>
    </Box>
  );
}