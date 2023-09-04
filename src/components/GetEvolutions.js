import React, { useEffect, useState } from 'react';

function GetEvolutions({ Pokemon , setPokemon }) {
  const [evolutionLine, setEvolutionLine] = useState([]);

  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handlePokemonClick = async (pokemonName) => {
    if(pokemonName !== Pokemon.name){
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const response = await fetch(url);
      if (response.ok) {
        const pokemonData = await response.json();
        setPokemon(null);
        setPokemon(pokemonData);
      }
    }
  };


  function formatEvolvesTo(evolutionDetails) {

    let result = '';
    
    if (evolutionDetails) {
      if (evolutionDetails[0]?.evolution_details[0]?.min_level !== null) {
        result = `Level ${evolutionDetails[0].evolution_details[0].min_level}`;
      } else if (evolutionDetails[0]?.evolution_details[0]?.item) {
        result = `Use ${evolutionDetails[0].evolution_details[0].item.name}`;
        result =  result.replace("-"," ")
      } else if (evolutionDetails[0]?.evolution_details[0]?.min_happiness !== null) {
        result = `Happiness`;
      }
    }
    return result;
  }

  useEffect(() => {
    async function fetchEvolution() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${(Pokemon.name).toLowerCase()}`);
        const data = await response.json();

        if (response.status === 200) {
          if (data.evolution_chain) {
            const evolutionChainResponse = await fetch(data.evolution_chain.url);
            const evolutionChainData = await evolutionChainResponse.json();

            const line = [{ name: evolutionChainData.chain.species.name, method: '' }];

            let evolutionDetails = evolutionChainData.chain.evolves_to;
            while (evolutionDetails.length > 0) {
              const method = formatEvolvesTo(evolutionDetails);
              line.push({ name: evolutionDetails[0].species.name, method });
              evolutionDetails = evolutionDetails[0].evolves_to;
            }

            setEvolutionLine(line);
          } else {
            console.log(`No se encontró información de evolución para ${Pokemon.name}.`);
          }
        } else {
          console.log(`No se encontró información para ${Pokemon.name}.`);
        }
      } catch (error) {
        console.error(`Ocurrió un error: ${error}`);
      }
    }

    fetchEvolution();
  }, [Pokemon.name]);

  return (
    <div className="containerEvolution">
      {evolutionLine.map((evolution, index) => ( 
        <React.Fragment key={index}>
          <div className="evolutionMethod">
            <div className="arrow"></div>
            {evolution.method}
          </div>
          <div className="evolutionName" onClick={() =>{handlePokemonClick(evolution.name)}}>
            {capitalize(evolution.name)}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
  
}
export default GetEvolutions;
