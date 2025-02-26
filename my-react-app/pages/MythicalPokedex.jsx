import React, { useEffect, useState } from 'react'
import { getAllMythicalPokemons } from '../../api';
import PokemonTable from './PokemonTable';

const MythicalPokedex = () => {

    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        async function loadLegendaryPokemons() {
            setLoading(true)
            try {
                const data = await getAllMythicalPokemons();
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

export default MythicalPokedex