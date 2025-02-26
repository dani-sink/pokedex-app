import React, { useEffect, useState } from 'react'
import { getAllLegendaryPokemons, getAllPokemonSpecies } from '../../api';
import PokemonTable from './PokemonTable';

const LegendaryPokedex = () => {

    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    

    useEffect(() => {
        async function loadLegendaryPokemons() {
            setLoading(true)
            try {
                const data = await getAllLegendaryPokemons();
                setPokemonData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false)
            }
        }

        loadLegendaryPokemons();

    }, [])

    return (
        <div>
            {
            pokemonData !== null ?
             (
             <div>
                 
                <PokemonTable pokemonsData={
                    pokemonData
                }/>
             </div>)
                : (<h2>Loading...</h2>) }
        </div>
    )

}

export default LegendaryPokedex