import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import { ListView } from './components/ListView';
import DetailsView from './components/DetailsView';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize='xl'>
      <Routes>
        <Route path='/' element={<ListView />} />
        <Route path='/details/' element={<DetailsView />} />
      </Routes>
    </Box>
  </ChakraProvider>
);
