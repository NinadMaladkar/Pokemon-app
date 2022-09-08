import { Box, Center, Flex, Image, Spacer, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function DetailsView() {
  const location = useLocation();

  const [pokemonDetails, setPokemonDetails] = useState({
    id: 0,
    name: '',
    weight: 0,
    types: [],
    abilities: [],
    moves: [],
    height: 0,
    image: '',
  });

  useEffect(() => {
    console.log('Location', location);
    if (location.state) {
      let _state = location.state as any;
      setPokemonDetails(_state);
    }
  }, [location]);
  return (
    <div>
      <Center backgroundColor='teal.100'>
        <Box
          borderRadius='xl'
          p={5}
          m={5}
          width={450}
          backgroundColor='teal'
          rounded='lg'
          bgColor='teal.400'
          boxShadow='dark-lg'>
          <Center>
            <Text fontSize='4xl'>{pokemonDetails.name.toUpperCase()}</Text>
          </Center>
          <Center
            backgroundColor='teal.300'
            borderBottom='2px'
            borderColor='teal.500'
            rounded='lg'
            boxShadow='xl'>
            <Image
              src={pokemonDetails.image}
              alt={pokemonDetails.name}
              boxSize='250'
            />
          </Center>
          <Flex mt={3}>
            <Text> Height: {pokemonDetails.height} </Text>
            <Spacer />
            <Text> Weight: {pokemonDetails.weight} </Text>
          </Flex>
          <Center>
            Abilities: <Spacer />
            {pokemonDetails.abilities
              .slice(0, 3)
              .map((ability: { ability: { name: string } }, i) => {
                return (
                  <Box
                    border='1px'
                    borderRadius='md'
                    fontSize={16}
                    m={2}
                    p={2}
                    key={i}>
                    {ability.ability.name}
                  </Box>
                );
              })}
          </Center>
          <Center>
            Type: <Spacer />
            {pokemonDetails.types
              .slice(0, 3)
              .map((type: { type: { name: string } }, i) => {
                return (
                  <Box
                    border='1px'
                    borderRadius='md'
                    m={2}
                    p={2}
                    fontSize={16}
                    key={i}>
                    {type.type.name}
                  </Box>
                );
              })}
          </Center>
          <Center>
            Moves:
            <Spacer />
            {pokemonDetails.moves
              .slice(0, 3)
              .map((move: { move: { name: string } }, i) => {
                return (
                  <Box
                    border='1px'
                    borderRadius='md'
                    fontSize={16}
                    m={2}
                    p={2}
                    key={i}>
                    {move.move.name}
                  </Box>
                );
              })}
          </Center>
        </Box>
      </Center>
    </div>
  );
}

export default DetailsView;
