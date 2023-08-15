import React, { useEffect, useState } from 'react';

function GetEvolutions({ pokemonName }) {
  const [evolutionLine, setEvolutionLine] = useState([]);

  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    async function fetchEvolution() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`);
        const data = await response.json();

        if (response.status === 200) {
          if (data.evolution_chain) {
            const evolutionChainResponse = await fetch(data.evolution_chain.url);
            const evolutionChainData = await evolutionChainResponse.json();

            const line = [evolutionChainData.chain.species.name];

            let evolutionDetails = evolutionChainData.chain.evolves_to;
            while (evolutionDetails.length > 0) {
              line.push(evolutionDetails[0].species.name);
              evolutionDetails = evolutionDetails[0].evolves_to;
            }

            setEvolutionLine(line);
          } else {
            console.log(`No se encontró información de evolución para ${pokemonName}.`);
          }
        } else {
          console.log(`No se encontró información para ${pokemonName}.`);
        }
      } catch (error) {
        console.error(`Ocurrió un error: ${error}`);
      }
    }

    fetchEvolution();
  }, [pokemonName]);

  return (
    <div className="containerEvolution">
      {evolutionLine.map((evolution, index) => (
        <p key={index}>{capitalize(evolution)}</p>
      ))}
    </div>
  );
}

export default GetEvolutions;
