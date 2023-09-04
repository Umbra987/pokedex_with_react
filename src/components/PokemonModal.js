import React,{ useEffect, useState } from 'react';
import Modal from 'react-modal';
import PokemonSpawnLocations from './PokemonSpawnLocations.js';
import GetEvolutions from './GetEvolutions.js';
import CalculateWeaknesses  from './CalculateWeaknesses.js';
import "../styles/PokemonModal.css"

function PokemonModal({ Pokemon, setPokemon , handleClosePopup }) {

  const [modalScroll, setModalScroll] = useState([0, 0]);



  useEffect(() => {
    if (Pokemon !== null) {
      const modalElement = document.getElementById("modalPokemon");
      if (modalElement) {
        modalElement.scrollTo(...modalScroll);
      }
    }
  }, [modalScroll, Pokemon]);
  

  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const typesPokemon = (types) => {
    return types.map((type, index) => (
      <div key={index} className={`typePokemon ${type.type.name}`}>
        {capitalize(type.type.name)}
      </div>
    ));
  };

  const getDescriptionWithPercentage = (description, chance) => {
    if (description.includes("$effect_chance")) {
      return description.replace("$effect_chance", chance !== undefined ? `${chance}` : "");
    }
    return description;
  };

  const [moveInfo, setMoveInfo] = useState([]);

  const getMoveInfo = async (moveUrl) => {
    if (!moveUrl) return null;
  
    try {
      const response = await fetch(moveUrl);
      if (!response.ok) {
        throw new Error('Move not found');
      }
      const data = await response.json();
  
      const shortEffect = data.effect_entries[0]?.short_effect || "No description available";

      setMoveInfo(prevState => [...prevState, {
        name: data.name,
        accuracy: data.accuracy,
        damageClass: data.damage_class?.name || "Unknown",
        power: data.power || "Unknown",
        pp: data.pp || "Unknown",
        description: shortEffect,
        effect_chance: data.effect_chance
      }]);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (Pokemon && Pokemon.moves) {
      setMoveInfo([]);
      Pokemon.moves.forEach((move) => {
        getMoveInfo(move.move.url);
      });
    }
   
  }, [Pokemon]);

  return (
    <Modal
    id='modalPokemon' 
    isOpen={Pokemon !== null} 
    onRequestClose={() => {
      handleClosePopup();
      setModalScroll([0, 0]);
    }}
    contentLabel="Pokemon Details"
    bodyOpenClassName="modal-open"
    >
      {Pokemon && (
        <div className='containerInfoPokemon'>
          <span className='closeModal' onClick={handleClosePopup}>X</span>
          
          <div className='headerInfoPokemon'>
            <h3 className='namePokemonModal'>{capitalize(Pokemon.name)}</h3>
            {typesPokemon(Pokemon.types)}
          </div>

          <div className='appearancePokemon'>
            <h2>Normal</h2>
            <img src={Pokemon.sprites.front_default} alt={Pokemon.name + " front default"} />
            <img src={Pokemon.sprites.back_default} alt={Pokemon.name  + " back default"} />
            <h2>Shiny</h2>
            <img src={Pokemon.sprites.front_shiny} alt={Pokemon.name + " front shiny"} />
            <img src={Pokemon.sprites.back_shiny} alt={Pokemon.name  + " back shyni"} />
          </div>

          <div className='containerRealisticImgs'>
            <img src={Pokemon.sprites.other['official-artwork'].front_default} alt={"realisticImg of " + Pokemon.name}></img>
            <img src={Pokemon.sprites.other['official-artwork'].front_shiny} alt={"realisticImg of " + Pokemon.name}></img>
          </div>

          <div className='containerMoves'>
            {moveInfo.length > 0 ? (
                moveInfo.map((move, index) => (
                  <div key={index} className={`movePokemon `}>
                    <h3>{capitalize(move.name)}</h3>
                    <p className={move.damageClass}>Type: {move.damageClass} </p>
                    <p>{move.accuracy !== null && ` Accuracy: ${move.accuracy} Power: ${move.power}  PP: ${move.pp}`}</p>
                    <p>{getDescriptionWithPercentage(move.description,move.effect_chance)}</p>
                  </div>
                ))
            ) : (
              <p>No moves available</p>
            )}
          </div>
          <div className='containerLocationAreaEncounters'>
            <div className='titleAreas'>Ubication<div className='imgTitleAreas'></div>
            </div>
            <PokemonSpawnLocations pokemonId={Pokemon.id} />
          </div>
            <CalculateWeaknesses typeInfo={Pokemon.types} />
            <GetEvolutions Pokemon={Pokemon} setPokemon={setPokemon}/>
        </div>
        
      )}
    </Modal>
  );
}

export default PokemonModal;
