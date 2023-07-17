import React, { useEffect, useState } from 'react';
import '../styles/ShowPokemon.css';
import '../styles/colorTypes.css';
import PokemonModal from './PokemonModal';

function ShowPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState({});

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

  const fetchTypesPokemons = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (response.ok) {
        const pokeInfo = await response.json();
        return pokeInfo.types;
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const typesPokemon = (types) => {
    return types.map((type, index) => (
      <div key={index} className={`typePokemon ${type.type.name}`}>
        {type.type.name}
      </div>
    ));
  };

  const handlePokemonClick = async (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await fetch(url);
    if (response.ok) {
      const pokemonData = await response.json();
      console.log(pokemonData);
      setSelectedPokemon(pokemonData);
    }
  };

  const handleClosePopup = () => {
    setSelectedPokemon(null);
  };

  useEffect(() => {
    const fetchPokemonsTypes = async () => {
      const typesData = {};

      for (const pokemon of pokemons) {
        const types = await fetchTypesPokemons(pokemon.name);
        typesData[pokemon.name] = types;
      }

      setPokemonTypes(typesData);
    };

    fetchPokemonsTypes();
  }, [pokemons]);

  const printPokemons = () => {
    return pokemons.map(pokemon => {
      const types = pokemonTypes[pokemon.name] || [];
  
      return (
        <div className="cartPokemon  flip" key={pokemon.name} onClick={() => handlePokemonClick(pokemon.name)}>
          <div className="imgPokemon frontSide">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(pokemon.url)}.png`} alt={pokemon.name} />
            <div className="pokemonNumber">
              <span className="numberLabel">Nº</span>
              {getPokemonIdFromUrl(pokemon.url)}
            </div>
          </div>
          <div className="backSide namePokemon typePokemonCard">
            {capitalize(pokemon.name)}
            {typesPokemon(types)}
          </div>
        </div>
      );
    });
  };
  

  return (
    <div className="contentResult">
      <div className="contentPokemons" id="containerPokemons">
        {printPokemons()}
      </div>
      <PokemonModal Pokemon={selectedPokemon} handleClosePopup={handleClosePopup} />
    </div>
  );
}

export default ShowPokemon;
