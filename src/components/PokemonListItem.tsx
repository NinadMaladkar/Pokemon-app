import { Box, Image, Button, VStack, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import { getPokemonImage } from '../apis';
import { Link } from 'react-router-dom';

interface ListProps {
  id: number;
  name: string;
  weight: number;
  types: string[];
  abilities: string[];
  moves: string[];
  height: number;
}

interface ListState {
  pokemonImage: string;
  pokemonTypes: string[];
}

class ListItem extends React.Component<ListProps, ListState> {
  image: string = '';
  async componentDidMount(): Promise<void> {
    await this.getEachPokemonImage(this.props.id);
  }

  async componentDidUpdate(): Promise<void> {
    await this.getEachPokemonImage(this.props.id);
  }

  getEachPokemonImage = async (id: number): Promise<void> => {
    this.image = await getPokemonImage(id);

    this.setState({
      pokemonImage: this.image,
    });
  };

  render() {
    return (
      <div>
        <Flex>
          <VStack>
            <Box>
              <Text fontSize='2xl'>
                {this.props.name[0].toUpperCase() + this.props.name.slice(1)}
              </Text>
            </Box>
            <Box
              backgroundColor='teal.200'
              borderBottom='2px'
              borderColor='teal.500'
              rounded='lg'
              boxShadow='lg'>
              <Image src={this.image} alt={this.props.name} />
            </Box>
            <Box>
              <Text fontSize='sm'>Weight: {this.props.weight} </Text>
            </Box>
            <Box>
              <Link
                to='details/'
                state={{
                  id: this.props.id,
                  name: this.props.name,
                  weight: this.props.weight,
                  types: this.props.types,
                  abilities: this.props.abilities,
                  moves: this.props.moves,
                  height: this.props.height,
                  image: this.image,
                }}>
                <Button
                  variant='ghost'
                  _hover={{ backgroundColor: 'yellow.100' }}>
                  More Details
                </Button>
              </Link>
            </Box>
          </VStack>
        </Flex>
      </div>
    );
  }
}

export default ListItem;
