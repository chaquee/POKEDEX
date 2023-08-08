import React from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css'; // Asegúrate de tener estilos para esta página

function PokemonDetails({ myPokemons }) {
  const { name } = useParams(); // Obtenemos el nombre del Pokémon de los parámetros de la URL
  const pokemon = myPokemons.find(pokemon => pokemon.name.toLowerCase() === name);

  if (!pokemon) {
    return <div>Pokémon no encontrado</div>;
  }

  return (
    <div className="pokemon-details-container">
      <h1 className='h1-styled'>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <div className="pokemon-details">
        <p>Altura: {pokemon.height} mts</p>
        <p>Peso: {pokemon.weight} kg</p>
        <div className="type-container">
          <h2>Tipo:</h2>
          <div className="pokemon-type">
            {pokemon.types.map((type, index) => (
              <div key={index} className="type-circle" style={{ backgroundColor: typeColors[type].color }}>
                <div className="circle-content">
                  <div className="circle-text">{typeColors[type].name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
