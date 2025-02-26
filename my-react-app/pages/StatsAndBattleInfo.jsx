import React from 'react'
import { useOutletContext } from 'react-router-dom'

const StatsAndBattleInfo = () => {
    const { pokemon, pokemonSpecies } = useOutletContext()
  return (
    <div>StatsAndBattleInfo</div>
  )
}

export default StatsAndBattleInfo