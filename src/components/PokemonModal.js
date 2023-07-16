import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import "../styles/PokemonModal.css"

function PokemonModal({ Pokemon, handleClosePopup }) {
  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const typesPokemon = (types) => {
    return types.map((type, index) => (
      <div key={index} className={`typePokemon ${type.type.name}`}>
        {type.type.name}
      </div>
    ));
  };

  const getDescriptionWithPercentage = (description, chance) => {
    if (description.includes("$effect_chance")) {
      return description.replace("$effect_chance", chance !== undefined ? `${chance}%` : "");
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
        description: shortEffect
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
    isOpen={Pokemon !== null} 
    onRequestClose={handleClosePopup} 
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
              <>
                {moveInfo.map((move, index) => (
                  <div key={index} className={`movePokemon ${move.damageClass}`}>
                    <h3>{capitalize(move.name)}</h3>
                    <p>type: {move.damageClass}</p>
                    <p>{move.accuracy !== null && ` Accuracy: ${move.accuracy} Power: ${move.power}  PP: ${move.pp}`}</p>
                    <p>{getDescriptionWithPercentage(move.description,move.effect_chance)}</p>
                  </div>
                ))}
              </>
            ) : (
              <p>No moves available</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export default PokemonModal;
