import { useEffect, useState } from "react"
import PokemonTable from "./PokemonTable";
import { getAllPokemons } from "../../api";



export default function Pokedex(){
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    

    useEffect(() => {
        async function loadPokemons() {
            setLoading(true)
            try {
                const data = await getAllPokemons();
                setPokemonData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false)
            }
        }

        loadPokemons();

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