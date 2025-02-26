import React from 'react'
import { useOutletContext } from 'react-router-dom'

const Moves = () => {
    const { pokemon, pokemonSpecies } = useOutletContext()
  return (
    <div>Moves</div>
  )
}

export default Moves