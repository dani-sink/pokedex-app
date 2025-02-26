import { useEffect, useState } from "react"
import { getPokemon, getPokemonSpecies } from "../../api";
import { Link, NavLink, Outlet, useParams, useSearchParams } from "react-router-dom";
import "./PokemonDetails.css"
import TypeIcon from "../components/Type/TypeIcon";

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

export default function PokemonDetails(){
    const params = useParams()
    const [pokemon, setPokemon] = useState(null)
    const [pokemonSpecies, setPokemonSpecies] = useState(null)
    const [pokemonAbilities, setPokemonAbilities] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isShiny, setIsShiny] = useState(false)
    const capitalize = s => s && String(s[0]).toUpperCase() + String(s).slice(1)

   

    useEffect(() =>{
        async function loadPokemon(){
            setLoading(true)
            try {
                const newData = await getPokemon(params.name);
                setPokemon(newData.data)
                setPokemonAbilities(newData.abilitiesData)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        async function loadPokemonSpecies(){
            setLoading(true)
            try {
                const data = await getPokemonSpecies(params.name);
                setPokemonSpecies(data)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadPokemon();
        loadPokemonSpecies()
    }, [params.name])

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        textUnderlineOffset: '15px',
        textDecorationColor: '#B22222',
        textDecorationThickness: '5px',
        textDecorationStyle: 'solid',
        color: "#222224",
        opacity: '1',
        fontSize: 'larger'
    }

    const inactiveStyle = {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: '#222224',
        opacity: '0.5',
        fontSize: 'larger'
    }

    const extractSprites = (obj) => {
        let sprites = [];
        for (let key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                sprites = sprites.concat(extractSprites(obj[key]))
            } else if (typeof obj[key] === 'string'){
                sprites.push(obj[key])
            }
        }
        return sprites
    }

    const getPokemonGenus = (pokemonSpeciesData) => {
        const genusEntry = pokemonSpeciesData?.genera?.find(entry => entry?.language?.name === "en");

        return genusEntry ? genusEntry.genus : "Unknown"
    }

    const getGeneration = (string) => {
        let str_arr = string.split('-')
        str_arr[1] = str_arr[1].toUpperCase()
        str_arr[0] = capitalize(str_arr[0])
        return str_arr.join(" ")
    }

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
    
      const pokemonTypes = pokemon?.types.map(entry => entry.type.name)
    
    return (
        pokemon != null && pokemonSpecies != null ?
        <div className="pokemon-details-container" >
            <div className="details-main-section" >
                <div className='pokemon-name-id-container'>
                    <div className='pokemon-name-container'>
                        <h1>{`#${pokemon.id.toString().padStart(3, '0')} - ${pokemon.name.toUpperCase()}`}</h1>
                    </div>
                </div>
                <div className="pokemon-img-parent-container" >
                    <div 
                        className="pokemon-img-container"
                        style={{
                            background: getGradientBackground(pokemonTypes)
                        }}
                        >
                        <img 
                            src={pokemon.sprites.other['official-artwork'].front_default} 
                            alt={pokemon.name}
                            className="pokemon-img"
                        />
                    </div>
                </div>
               
            </div>
            <div className="pokemon-details-layout-container">
                <nav className="pokemon-details-layout" >
                    <NavLink
                        to=''
                        end
                        style={({isActive}) => isActive ? activeStyle: inactiveStyle}
                    >
                        Overview
                    </NavLink>
                    <NavLink
                        to='stats'
                        style={({isActive}) => isActive ? activeStyle: inactiveStyle}
                    >
                        Stats & Battle Info
                    </NavLink>
                    <NavLink
                        to='moves'
                        style={({isActive}) => isActive ? activeStyle: inactiveStyle}
                    >
                        Moves
                    </NavLink>
                </nav>
                <section>
                    <Outlet context={{pokemon, pokemonSpecies, pokemonAbilities}} />
                </section>
            </div>
        </div>
        : <h2>Loading...</h2>
    )
}