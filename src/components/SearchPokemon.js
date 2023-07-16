import React, { useEffect, useState } from 'react';
import '../styles/SearchPokemon.css';

function SearchPokemon() {
    const [pokemonData, setPokemonData] = useState(null);
    
    const capitalize = string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const checkInput = (value) =>{
      if(value === ""){

        const cartsPokemons = document.getElementsByClassName("cartPokemon");

        for (let i = 0; i < cartsPokemons.length; i++) {
          const cartPokemon = cartsPokemons[i];
          cartPokemon.style.display = "flex";      
        }


        const detailsPage = document.getElementsByClassName("detailsPage");
          for(var i = 0; i < detailsPage.length ; i++){
            detailsPage[i].classList.remove("none");
          }
      }
    }

    const SearchData = async () => { 
      const input = document.getElementById("contentSearch");
      const pokemonName = input.value.toLowerCase().trim();
      if(pokemonName !== ""){
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

    const KeyPress = (event) => {
      if (event.key === "Enter") {
        SearchData();
      }
    };
  
    useEffect(() => {
      if (pokemonData) {
      
        var detailsPage = document.getElementsByClassName("detailsPage");
          for(var i = 0; i < detailsPage.length ; i++){
            detailsPage[i].classList.add("none");
          }

        const cartPokemons = document.getElementsByClassName("cartPokemon");
        for (let i = 0; i < cartPokemons.length; i++) {
          const cartPokemon = cartPokemons[i];
          const namePokemon = cartPokemon.getElementsByClassName("namePokemon")[0].textContent;
          if (namePokemon !== capitalize(pokemonData.name)) {
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
          onKeyDown={KeyPress}
        ></input>
        <button id="searchButton" onClick={SearchData}>Buscar</button>
      </div>
    );
  }
  
  export default SearchPokemon;
