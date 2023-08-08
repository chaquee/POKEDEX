import './App.css';
import React, { useState } from 'react';




const typeColors = {
  normal: { color: 'grey', name: 'Normal' },
  fire: { color: 'red', name: 'Fuego' },
  water: { color: 'blue', name: 'Agua' },
  grass: { color: 'green', name: 'Hoja' },
  flying: { color: 'skyblue', name: 'Volador' },
  fighting: { color: 'brown', name: 'Peleador' },
  poison: { color: 'purple', name: 'Veneno' },
  electric: { color: 'yellow', name: 'Electrico' },
  ground: { color: 'tan', name: 'Tierra' },
  rock: { color: 'darkgoldenrod', name: 'Piedra' },
  psychic: { color: 'pink', name: 'Psiquico' },
  ice: { color: 'lightblue', name: 'Hielo' },
  bug: { color: 'olive', name: 'Bicho' },
  ghost: { color: 'indigo', name: 'Fantasma' },
  steel: { color: 'steelblue', name: 'Acero' },
  dragon: { color: 'darkviolet', name: 'Dragon' },
  dark: { color: 'darkslategray', name: 'Oscur' },
  fairy: { color: 'lightpink', name: 'Hada' },
};



function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonType, setPokemonType] = useState('');
  const [myPokemons,  setMyPokemons] = useState([]);
  
  const addPokemon = (infoPokemon) =>{
    
    if (!infoPokemon) return;
    setMyPokemons((prevPokemons) => [...prevPokemons, infoPokemon]);

  } ;

  const deletPokemon = (index) => {
    setMyPokemons((prevPokemons) => {
      const newPokemons = [...prevPokemons];
      newPokemons.splice(index, 1); 
      return newPokemons;
    });
  };

  const searchPokemon = (event) => {
    event.preventDefault();    

    if (pokemonName.length === 0) {
      alert('Por favor, ingresa el nombre de un Pokémon.');
      return;
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo obtener el Pokémon.');
        }
        return response.json();
      })
      .then((data) => {
        const pokemonInfo = {
          name: data.name.toUpperCase(),
          image: data.sprites.front_default,
          height: data.height / 10,
          weight: data.weight / 10,
          types: data.types.map((type) => type.type.name),
        };
        setPokemonInfo(pokemonInfo);
        setPokemonType(pokemonInfo.types); 
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="container">
      <div className='left-column' >
      <h1 className='h1-syled'>Pokedex</h1>
  <form className="form-container">
        <label>
          <input  placeholder='Nombre del pokemon' className='input-styled' type="text" onChange={(e) => setPokemonName(e.target.value)} />
        </label>
        <button className='button-ok' onClick={searchPokemon}> OK </button>
      </form>
      <button className='button-atrapar' onClick={() => addPokemon(pokemonInfo)} disabled={myPokemons.length >= 6}>Atrapar</button>
    </div>
      {pokemonInfo && (
        <div className='right-column' key={pokemonInfo.name} >
          <h2>{pokemonInfo.name}</h2>
          <img src={pokemonInfo.image} alt={pokemonInfo.name} />
          <p>Altura: {pokemonInfo.height} mts</p>
          <p>Peso: {pokemonInfo.weight} kg</p>
          <h2>Tipo:</h2>
          {pokemonType && (
            <div className="type-container">
            
            {pokemonType.map((type, index) => (
              <div key={index} className="type-circle" style={{ backgroundColor: typeColors[type].color }}>
                <div className="circle-content">
                <div className="circle-text">{typeColors[type].name}</div>
                </div>
              </div>
            ))}
          </div>
          )}
        
        </div>
      )}
        
              

    

        <div className='buttom-column'>
        <ul className="myPokemonList">
          {myPokemons.map((pokemon, id) => (
            <li key={id}>
              <p onClick={() => deletPokemon(id)}>X</p>
            <h2 className='h2' >{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>Altura: {pokemon.height} mts</p>
            <p>Peso: {pokemon.weight} kg</p>
            <div className="type-container">
              <p><h2>Tipo:</h2>
              {pokemon.types.map((type) => (
                <div>{typeColors[type].name}</div>
              ))}</p>
            </div>
          </li>
         ))}
       </ul>
     </div>
   </div>
 );
}

export default App;

