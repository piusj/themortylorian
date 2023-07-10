import { Box, Heading, Input } from '@chakra-ui/react';
import React, { Dispatch } from 'react';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  setTitle: Dispatch<string>;
}

export default function StepTitleBody({ defaultValue, setTitle }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
