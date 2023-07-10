import { Box, Heading, Input } from '@chakra-ui/react';

export default function StepTitleBody({ defaultValue, setTitle }) {
  function handleChange(e) {
    setTitle(e.target.value);
  }

  return (
    <Box>
      <Heading>What&apos;s your title?</Heading>

      <Box>
        <Input
          type="text"
          placeholder="Space Monger"
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
