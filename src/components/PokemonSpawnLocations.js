import React, { useState, useEffect } from 'react';

function PokemonSpawnLocations({ pokemonId }) {

  const [spawnLocations, setSpawnLocations] = useState([]);

  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    const fetchSpawnLocations = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`);
        
        if (!response.ok) {
          throw new Error('No se pudo obtener la información de las localizaciones del Pokémon.');
        }

        const data = await response.json();

        

        if (Array.isArray(data) && data.length > 0) {
          const locations = data.map((encounter) => {
            const modifiedString = encounter.location_area.name.replace(/-/g, " ");
            return {
              modifiedString: modifiedString,
            };
          });

          setSpawnLocations(locations);
        } else {
          setSpawnLocations([]);
        }
      } catch (error) {
        console.error('Error al obtener las localizaciones del Pokémon:', error);
        setSpawnLocations([]);
      }
    };

    fetchSpawnLocations();
  }, [pokemonId]);

  return (
    <div>
      {spawnLocations.length > 0 ? (
        spawnLocations.map((location, index) => (
          <div key={index} className='areaEncounterPokemon'>
            <p>{capitalize(location.modifiedString)}</p>
          </div>
        ))
      ) : (
        <p className='unknownLocation'>No spawn locations were found for the Pokémon.</p>
      )}
    </div>
  );
}

export default PokemonSpawnLocations;
