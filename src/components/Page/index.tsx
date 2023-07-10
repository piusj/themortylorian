import { Box } from '@chakra-ui/react';
import Header from '@/components/Header';

export default function Page({ children, ...props }) {
  return (
    <Box {...props}>
      <Header />
      <PageBody>{children}</PageBody>
    </Box>
  );
}

const PageBody = ({ children }) => (
  <Box p={10} h="calc(100vh - 80px)">
    {children}
  </Box>
);
