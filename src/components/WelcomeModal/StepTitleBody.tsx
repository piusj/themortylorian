import {Box, Heading, Input} from "@chakra-ui/react";

export default function StepTitleBody() {
  return (
    <Box>
      <Heading>What&apos;s your title?</Heading>

      <Box>
        <Input type="text" placeholder="Space Monger" />
      </Box>
    </Box>
  );
}