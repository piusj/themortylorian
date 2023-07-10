import { Box, Heading, Input } from '@chakra-ui/react';
import React, { Dispatch } from 'react';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  setUserName: Dispatch<string>;
}

export default function StepUsernameBody({ defaultValue, setUserName }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
