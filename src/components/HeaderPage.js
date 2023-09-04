import '../styles/HeaderPage.css'
import SearchPokemon from "./SearchPokemon.js";

function HeaderPage(){
    return(
        <div className='headerPage'>
        <header></header>
        <SearchPokemon />
        </div>
    );
}

export default HeaderPage;