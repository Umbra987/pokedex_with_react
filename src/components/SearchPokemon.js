import React, { useEffect, useState } from 'react';
import '../styles/SearchPokemon.css';

function SearchPokemon() {
  const [pokemonData, setPokemonData] = useState(null);

  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const checkInput = (value) => {
    if (value === "") {
      const containerPokemon = document.getElementById("containerPokemons");
      const cartsPokemons = containerPokemon.getElementsByClassName("cartPokemon");
      

      for (let i = 0; i < cartsPokemons.length; i++) {
        const cartPokemon = cartsPokemons[i];
        cartPokemon.style.display = "flex";
      }


    }
  };

  const SearchData = async () => {
    const input = document.getElementById("contentSearch");
    const pokemonName = input.value.toLowerCase().trim();
    
    if (pokemonName !== "") {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const results = await fetch(url);
  
      if (results.ok) {
        const resultsJSON = await results.json();
        setPokemonData(resultsJSON);
      } else {
        const responseText = await results.text();
        if (responseText === "Not Found") {
          alert("No se encontraron resultados");
          input.value = "";
          checkInput(input.value);
        } else {
          console.error("Error en la respuesta de la API:", responseText);
        }
      }
    }
  };
  
  useEffect(() => {
    if (pokemonData) {


      const containerPokemon = document.getElementById("containerPokemons");
      const cartsPokemons = containerPokemon.getElementsByClassName("cartPokemon");
      const namePokemon = capitalize(pokemonData.name);


      for (let i = 0; i < cartsPokemons.length; i++) {
        const cartPokemon = cartsPokemons[i];
        const name = cartPokemon.getElementsByClassName("namePokemon")[0].textContent;
        if (name !== namePokemon) {
          cartPokemon.style.display = "none";
        } else {
          cartPokemon.style.display = "flex";
        }
      }
    }
  }, [pokemonData]);

  return (
    <div className="containerSearch">
      <input
        type="text"
        placeholder="Ingrese el nombre del pokemon"
        id="contentSearch"
        onChange={(event) => checkInput(event.target.value)}
      ></input>
      <button id="searchButton" onClick={SearchData}>Buscar</button>
    </div>
  );
}

export default SearchPokemon;
