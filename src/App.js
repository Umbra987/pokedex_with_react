import './App.css';
import HeaderPage from './components/HeaderPage';
import SearchPokemon from './components/SearchPokemon';
import ShowPokemon from './components/ShowPokemon';

function App() {
  return(
    <div className="App">
      <HeaderPage/>
      <SearchPokemon/>
      <ShowPokemon/>
    </div>
  );
}

export default App;
