import React, { useEffect, useState } from 'react';
import '../styles/ShowPokemon.css';
import '../styles/colorTypes.css';
import PokemonModal from './PokemonModal';

function ShowPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');
      const data = await response.json();
      setPokemons(data.results);
    };

    fetchPokemons();
  }, []);

  const getPokemonIdFromUrl = url => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const printPokemons = () => {
    return pokemons.map(pokemon => {
      return (
        <div className="cartPokemon" key={pokemon.name} onClick={() => handlePokemonClick(pokemon.name)}>
          <div className="imgPokemon">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(pokemon.url)}.png`} alt={pokemon.name} />
            <div className="pokemonNumber">
              <span className="numberLabel">Nº</span>
              {getPokemonIdFromUrl(pokemon.url)}
            </div>
          </div>
          <div className="namePokemon" id="namePokemon">
            {capitalize(pokemon.name)}
          </div>
        </div>
      );
    });
  };

  const handlePokemonClick = async (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await fetch(url);
    if (response.ok) {
      const pokemonData = await response.json();
      setSelectedPokemon(pokemonData);
    }
  };

  const handleClosePopup = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="contentResult">
      <div className="contentPokemons" id="containerPokemons">
        {printPokemons()}
      </div>
      <PokemonModal Pokemon={selectedPokemon} handleClosePopup={handleClosePopup}/>
    </div>
  );
}

export default ShowPokemon;
