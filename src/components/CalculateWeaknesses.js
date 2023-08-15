function CalculateWeaknesses({ typeInfo }) {

  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

    const typesDebilities = {
      normal: ["fighting"],
      fighting: ["flying", "psychic", "fairy"],
      flying: ["rock", "electric", "ice"],
      poison: ["ground", "psychic"],
      ground: ["water", "grass", "ice"],
      rock: ["fighting", "ground", "steel", "water", "grass"],
      bug: ["flying", "rock", "fire"],
      ghost: ["ghost", "dark"],
      steel: ["fighting", "ground", "fire"],
      fire: ["water", "rock", "electric"],
      water: ["electric", "grass"],
      grass: ["fire", "ice", "poison", "flying", "bug"],
      electric: ["ground"],
      psychic: ["bug", "ghost", "dark"],
      ice: ["fighting", "rock", "steel", "fire"],
      dragon: ["ice", "dragon", "fairy"],
      dark: ["fighting", "bug", "fairy"],
      fairy: ["poison", "steel"],
    };

    const types = typeInfo.map(info => info.type.name);
    const weaknesses = types.reduce((allWeaknesses, type) => {
      return allWeaknesses.concat(typesDebilities[type] || []);
    }, []);
    
    const uniqueWeaknesses = [...new Set(weaknesses)];

      return (
        
        <div className='containerDebilities'>
          <h3>Debilities :</h3>
          {uniqueWeaknesses.map((debilitie, index) => (
            <div key={index} className={`typePokemon ${debilitie}`}>
              {capitalize(debilitie)}
            </div>
              )
            )
          }
        </div>
      );
  }

export default CalculateWeaknesses;  
  