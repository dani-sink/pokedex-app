import { useEffect, useState } from "react"
import PokemonTable from "./PokemonTable";
import { getAllPokemonSpecies } from "../../api";

const Pokedex2 = () => {
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    

    useEffect(() => {
        async function loadPokemonSpecies() {
            setLoading(true)
            try {
                const data = await getAllPokemonSpecies();
                setPokemonData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false)
            }
        }

        loadPokemonSpecies();

    }, [])

    console.log(pokemonData)

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

export default Pokedex2