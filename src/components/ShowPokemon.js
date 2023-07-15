import { useEffect, useState } from 'react';
import '../styles/ShowPokemon.css';

function ShowPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

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

  const printPokemons = () =>{ 
      return pokemons.map(pokemon => {
      return (
        <div className="cartPokemon" key={pokemon.name} >
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
      )})
  }

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
    </div>
  );
}

export function printPokemons() {};
export default ShowPokemon;
