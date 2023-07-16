import React, { useEffect, useState } from 'react';
import '../styles/ShowPokemon.css';
import '../styles/colorTypes.css'
import Modal from 'react-modal';

function ShowPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        setPokemons(data.results);
        setTotalPages(Math.ceil(data.count / pageSize));
      })
      .catch(error => {
        console.error('Ocurrió un error:', error);
      });
  }, [currentPage, pageSize]);

  const getPokemonIdFromUrl = url => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

  const typesPokemon = (types) => {
    return types.map((type, index) => (
      <div key={index} className={`typePokemon ${type.type.name}`}>
        {type.type.name}
      </div>
    ));
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

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className="contentResult">
      <div className="contentPokemons" id="containerPokemons">
        <div className='numberPage detailsPage'>{currentPage}</div>
        {printPokemons()}
      </div>
      <div className="pagination detailsPage">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="buttonStyle">Previous</button>
        )}
        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="buttonStyle">Next</button>
        )}
      </div>
      <Modal isOpen={selectedPokemon !== null} onRequestClose={handleClosePopup} contentLabel="Pokemon Details">
        {selectedPokemon && (
          <div className='containerInfoPokemon'>
            <span className='closeModal' onClick={handleClosePopup}>X</span>

            <div className='headerInfoPokemon'>
              <h3 className='namePokemonModal'>{capitalize(selectedPokemon.name)}</h3>
              {typesPokemon(selectedPokemon.types)}
              </div>
            

            <div className='appearancePokemon'>
              <h2>Normal</h2>
              <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name}  />
              <img src={selectedPokemon.sprites.back_default} alt={selectedPokemon.name}  />
              <h2>Shiny</h2>
              <img src={selectedPokemon.sprites.front_shiny} alt={selectedPokemon.name}  />
              <img src={selectedPokemon.sprites.back_shiny} alt={selectedPokemon.name}  />
            </div>

            

          </div>
        )}
      </Modal>
    </div>
  );
}

export function printPokemons() { };
export default ShowPokemon;
