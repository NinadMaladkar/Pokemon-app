import React from 'react';
import {
  Center,
  Box,
  Button,
  HStack,
  Wrap,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FaArrowDown, FaArrowUp, FaArrowRight } from 'react-icons/fa';

import { getAllPokemon, getSinglePokemon, PokemonResponseData } from '../apis';
import { PokemonDetails } from '../apis';
import { SearchBar } from './SearchBar';
import PokemonListItem from './PokemonListItem';

export interface PokemonData {
  name: string;
  email: string;
  username: string;
}

interface ListProps {}

interface ListState {
  pokemonData: PokemonDetails[];
  pokemonUrl: string;
  nextPageUrl: string;
  prevPageUrl: string;
  inputValue: string;
}

export class ListView extends React.Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {
      pokemonData: [],
      pokemonUrl: 'http://pokeapi.co/api/v2/pokemon',
      nextPageUrl: '',
      prevPageUrl: '',
      inputValue: '',
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }

  allPokemonData: PokemonResponseData = {
    results: [],
    next: '',
    previous: '',
  };
  pokemonDetails: string[] = [];
  result: PokemonDetails[] = [];
  filteredData: PokemonDetails[] = [];
  sortedData: PokemonDetails[] = [];

  async getPokemonDetails(url: string) {
    this.allPokemonData = await getAllPokemon(url);

    this.pokemonDetails = this.allPokemonData.results.map(
      (data: any): string => {
        return data.url;
      }
    );

    for (const url of this.pokemonDetails) {
      this.result.push(await getSinglePokemon(url));
    }

    this.setState({
      pokemonData: this.result,
      nextPageUrl: this.allPokemonData.next,
      prevPageUrl: this.allPokemonData.previous,
    });
  }

  async getNextPageData(): Promise<void> {
    await this.getPokemonDetails(this.state.nextPageUrl);
  }

  async getPreviousPageData(): Promise<void> {
    if (this.state.prevPageUrl && this.state.prevPageUrl !== null) {
      await this.getPokemonDetails(this.state.prevPageUrl);
    }
  }

  async componentDidMount(): Promise<void> {
    await this.getPokemonDetails(this.state.pokemonUrl);
  }

  setSearchTerm(term: string): void {
    this.setState({ inputValue: term });

    this.filteredData = this.state.pokemonData.filter((data) => {
      return data['name'].toLowerCase().includes(term);
    });
  }

  sortByWeightAsc(): void {
    this.sortedData = this.state.pokemonData.sort((a, b) => {
      return a.weight > b.weight ? 1 : -1;
    });
    this.setState({
      pokemonData: this.sortedData,
    });
  }
  sortByWeightDesc(): void {
    this.sortedData = this.state.pokemonData.sort((a, b) => {
      return b.weight > a.weight ? 1 : -1;
    });
    this.setState({
      pokemonData: this.sortedData,
    });
  }

  render() {
    return (
      <div>
        <HStack>
          <Box>
            <SearchBar setSearchTerm={this.setSearchTerm} />
          </Box>
          <Text fontSize='16px'> Sort by Weight:</Text>
          <Box>
            <IconButton
              mr={2}
              size='xs'
              variant='outline'
              colorScheme='teal'
              aria-label='Call Sage'
              fontSize='16px'
              icon={<FaArrowDown />}
              onClick={() => {
                this.sortByWeightAsc();
              }}
            />
            <IconButton
              size='xs'
              variant='outline'
              colorScheme='teal'
              aria-label='Call Sage'
              fontSize='16px'
              icon={<FaArrowUp />}
              onClick={() => {
                this.sortByWeightDesc();
              }}
            />
          </Box>
        </HStack>

        <Center>
          <Wrap spacing='20px' mt='20px' justify='center'>
            {this.state.inputValue
              ? this.filteredData.map((pokemon, i) => {
                  return (
                    <Box
                      key={i}
                      mt='10px'
                      borderWidth='1px'
                      w='150px'
                      rounded='lg'
                      bgColor='teal.100'
                      boxShadow='md'>
                      <Center>
                        <Box p='2'>
                          <PokemonListItem
                            name={pokemon['name']}
                            id={pokemon.id}
                            weight={pokemon.weight}
                            types={pokemon.types}
                            abilities={pokemon.abilities}
                            height={pokemon.height}
                            moves={pokemon.moves}
                          />
                        </Box>
                      </Center>
                    </Box>
                  );
                })
              : this.state.pokemonData.map((pokemon, i) => {
                  return (
                    <Box
                      key={i}
                      mt='10px'
                      borderWidth='1px'
                      w='150px'
                      rounded='lg'
                      bgColor='teal.100'
                      boxShadow='md'>
                      <Center>
                        <Box p='2'>
                          <PokemonListItem
                            name={pokemon['name']}
                            id={pokemon.id}
                            weight={pokemon.weight}
                            types={pokemon.types}
                            abilities={pokemon.abilities}
                            height={pokemon.height}
                            moves={pokemon.moves}
                          />
                        </Box>
                      </Center>
                    </Box>
                  );
                })}
          </Wrap>
        </Center>
        <Center my={5}>
          <Button
            rightIcon={<FaArrowRight />}
            colorScheme='teal'
            variant='solid'
            onClick={() => {
              this.getNextPageData();
            }}>
            Next
          </Button>
        </Center>
      </div>
    );
  }
}
