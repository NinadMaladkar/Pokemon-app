import React from 'react';
import { Box, Input } from '@chakra-ui/react';

interface searchProps {
  setSearchTerm: Function;
}

export const SearchBar = ({ setSearchTerm }: searchProps) => {
  return (
    <Box mx={20} my={10} w={500}>
      <Input
        size='md'
        variant='outline'
        placeholder='Search your favorite Pokémon...'
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
    </Box>
  );
};
