import axios from 'axios';

export interface PokemonDetails {
  id: number;
  name: string
  abilities: string[];
  moves: string[];
  front_default: string;
  types: string[];
  weight: number;
  height: number;
}

export interface PokemonResponseData {
  results: string[];
  next: string;
  previous: string;
}

export interface PokemonImage {
  sprites: {
    front_default: string
  }
}


export const getAllPokemon = async (url: string): Promise<PokemonResponseData>  => {
  const response = await axios.get<PokemonResponseData>(url);
    
  return { results: response.data.results, next: response.data.next, previous: response.data.previous };
}

export const getSinglePokemon = async (url: string): Promise<PokemonDetails> => {
  const response = await axios.get<PokemonDetails>(url);
  
  return response.data
}

export const getPokemonImage = async (pokemonId: number): Promise<string> => {
  const pokeImage = await axios.get<PokemonImage>('https://pokeapi.co/api/v2/pokemon-form/' + pokemonId)
  
  return pokeImage.data.sprites.front_default;
}