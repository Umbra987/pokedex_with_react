import React, { useEffect, useState } from 'react';
import '../styles/SearchPokemon.css';

function SearchPokemon() {
    const [pokemonData, setPokemonData] = useState(null);
    
    const capitalize = string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
      const button = document.getElementById("searchButton");
      button.addEventListener("click", async () => {

        const input = document.getElementById("contentSearch");

        const pokemonName = input.value.toLowerCase().trim();
  
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        
        const results = await fetch(url);
  
        if (results.ok) {
          const resultsJSON = await results.json();
          setPokemonData(resultsJSON);
        } else {
          const responseText = await results.text();
          if (responseText === "Not Found") {
            alert("No se encontraron resultados");
            input.value = ""; // Borrar el contenido del input en caso de no encontrar resultados
          } else {
            console.error("Error en la respuesta de la API:", responseText);
          }
        }

        input.value="";
      });
    }, []);
  
    useEffect(() => {
      if (pokemonData) {
        const containerPokemons = document.getElementById("containerPokemons");
        containerPokemons.innerHTML = `
          <div class="cartPokemon" key=${pokemonData.name}>
            <div class="imgPokemon">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png" alt=${pokemonData.name} />
              <div class="pokemonNumber">
                <span class="numberLabel">Nº</span>
                ${pokemonData.id}
              </div>
            </div>
            <div class="namePokemon" id="namePokemon">
              ${capitalize(pokemonData.name)}
            </div>
          </div>`; // Add closing div tags here
    
        console.log(pokemonData.id);
      }
    }, [pokemonData]);
    
  
    return (
      <div className="containerSearch">
        <input
          type="text"
          placeholder="Ingrese el nombre del pokemon"
          id="contentSearch"
        ></input>
        <button id="searchButton">Buscar</button>
      </div>
    );
  }
  
  export default SearchPokemon;
  
