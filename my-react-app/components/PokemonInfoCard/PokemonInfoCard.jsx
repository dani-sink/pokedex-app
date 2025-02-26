import React from 'react'
import './PokemonInfoCard.css'
import TypeIcon from '../Type/TypeIcon'

const typeColors = {
  bug: "#92BC2C",
  dark: "#595761",
  dragon: "#0C69C8",
  electric: "#F2D94E",
  fairy: "#EE90E6",
  fighting: "#D3425F",
  fire: "#FBA54C",
  flying: "#A1BBEC",
  ghost: "#5F6DBC",
  grass: "#5FBD58",
  ground: "#DA7C4D",
  ice: "#75D0C1",
  normal: "#A0A29F",
  poison: "#B763CF",
  psychic: "#FA8581",
  rock: "#C9BB8A",
  steel: "#5695A3",
  water: "#539DDF"
};

const PokemonInfoCard = ({pokemonData, pokemonSpeciesData, getPokemonGenus}) => {

  const convertHeight = (height) => {
    const heightInInches = Math.round(height * 3.997);
    const heightInFeet = Math.round(heightInInches / 12);
    const remainingInches = heightInInches % 12;

    return `${heightInFeet}'${remainingInches}`
  }

  const convertWeight = (weight) => {
    const weightInPounds = (weight * 0.220462).toFixed(1);
    return `${weightInPounds} lbs`
  }

  const getPokemonDescription = (pokeSpeciesData) => {
    const flavorEntry = pokeSpeciesData.flavor_text_entries.find(entry => entry.language.name === "en")

    return flavorEntry ? flavorEntry.flavor_text.replace(/\s+/g,' ') : "Description not found"
  }

  const darkenColor = (colorHexVal) => {
    const r = parseInt(colorHexVal.slice(1,3), 16) * 0.55;
    const g = parseInt(colorHexVal.slice(3,5), 16) * 0.55;
    const b = parseInt(colorHexVal.slice(5,7), 16) * 0.55;
    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  }

  const getGradientBackground = (types) => {
    if (types.length === 1) {
      const primaryColor = typeColors[types[0]]
      const darkenedPrimaryColor = darkenColor(primaryColor)
      return `linear-gradient(45deg, ${darkenedPrimaryColor},  ${primaryColor})`;
    }
    return `linear-gradient(45deg, ${typeColors[types[0]]}, ${typeColors[types[1]]})`;
  }

  const pokemonTypes = pokemonData.types.map(entry => entry.type.name)

  console.log(pokemonTypes)


  return (
    <div 
      className='pokemon-info-card-container' 
    >
        <div 
        className='pokemon-img-container'
        style={{
          background: getGradientBackground(pokemonTypes)
        }}
        >
          <img 
            src={pokemonData.sprites.other['official-artwork'].front_default}
            alt={pokemonData.name}
            className='pokemon-img'
            />
        </div>
        <div className='pokemon-info-overview-container' >
          {/* <div className='pokemon-name-id-and-genus-container'>
            <div className='pokemon-name-and-id-container'>
              <h1>{`#${pokemonData.id.toString().padStart(3, '0')} - ${pokemonData.name.toUpperCase()}`}</h1>
            </div>
            <div className='pokemon-genus-container'>
              <h2>{getPokemonGenus(pokemonSpeciesData)}</h2>
            </div>
          </div> */}
          <div className='pokemon-types-container'> 
            {pokemonData.types?.map(item => (<TypeIcon key={item.slot} type={item.type.name} details={true} />))}
          </div>
          <div className='pokemon-height-and-weight-container'>
            <div 
            className='pokemon-height-container'
            style={{
              border: `2px solid ${typeColors[pokemonTypes[0]]}`,
              // outline: `2px solid ${typeColors[pokemonTypes.length === 2 ? pokemonTypes[1] : pokemonTypes[0]]}`,
              outlineOffset: '2px'
            }}
            >
              <p>HT</p>
              <p>{convertHeight(pokemonData.height)}</p>
            </div>
            <div 
            className='pokemon-weight-container'
            style={{
              border: `2px solid ${typeColors[pokemonTypes[0]]}`,
              // outline: `2px solid ${typeColors[pokemonTypes.length === 2 ? pokemonTypes[1] : pokemonTypes[0]]}`,
              outlineOffset: '2px'
            }}
            >
              <p>WT</p>
              <p>{convertWeight(pokemonData.weight)}</p>
            </div>
          </div>
        </div>
        <div className='pokemon-leftside-description-container'>
          <div 
          className='pokemon-description-container'
          style={{
            border: `2px solid ${typeColors[pokemonTypes[0]]}`,
            outline: `2px solid ${typeColors[pokemonTypes.length === 2 ? pokemonTypes[1] : pokemonTypes[0]]}`,
            outlineOffset: '2px'
          }}
          >
            <p className='pokemon-description-paragraph'>
              {getPokemonDescription(pokemonSpeciesData)}
            </p>
          </div>
        </div>
    </div>
  )
}

export default PokemonInfoCard