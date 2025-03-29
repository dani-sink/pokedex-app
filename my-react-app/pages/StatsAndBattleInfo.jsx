import React from 'react'
import { useOutletContext } from 'react-router-dom'
import TextInfo from '../components/TextInfo/TextInfo'
import ProgressBar from '../components/ProgressBar/ProgressBar'

const StatsAndBattleInfo = () => {
    const { pokemon, pokemonSpecies } = useOutletContext()
    
    const base_stats = {
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      specialAtk: pokemon.stats[3].base_stat,
      specialDef: pokemon.stats[4].base_stat,
      speed: pokemon.stats[5].base_stat
    }

    const getMax = (arr) => {
      let curMax = -Infinity
      for (let val of arr) {
        if (val > curMax){
          curMax = val
        }
      }
      return curMax
    }

    const getValueStats = (baseStats, IV, EV, level, isMaxVal, nature) => {
      let levelHundredStatValues = {}
      if (isMaxVal === true) {
        levelHundredStatValues = {
          hp: Math.floor(Math.abs(((2 * baseStats.hp + IV + Math.abs(EV/4)) * 100)/100) + level + 10),
          attack:  Math.floor((Math.abs(((2 * baseStats.attack + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
          defense:  Math.floor((Math.abs(((2 * baseStats.defense + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
          specialAtk:  Math.floor((Math.abs(((2 * baseStats.specialAtk + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
          specialDef:  Math.floor((Math.abs(((2 * baseStats.specialDef + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
          speed:  Math.floor((Math.abs(((2 * baseStats.speed + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
          
        }
        levelHundredStatValues.maxStat = getMax(Object.values(levelHundredStatValues))
      } else {
          levelHundredStatValues = {
            hp: Math.floor(Math.abs(((2 * baseStats.hp + IV + Math.abs(EV/4)) * 100)/100) + level + 10),
            attack:  Math.floor((Math.abs(((2 * baseStats.attack + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
            defense:  Math.floor((Math.abs(((2 * baseStats.defense + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
            specialAtk:  Math.floor((Math.abs(((2 * baseStats.specialAtk + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
            specialDef:  Math.floor((Math.abs(((2 * baseStats.specialDef + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
            speed:  Math.floor((Math.abs(((2 * baseStats.speed + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
          }
      }
      return levelHundredStatValues
    }

    const getPercentage = (curStat, maxStat) => Math.floor((curStat / maxStat) * 100)

    
  return (
    <div>
      <TextInfo title={'Base Stats'} width={'80%'} height={'auto'}>
        <div>
          <p>HP</p>
          <p>{base_stats.hp}</p>
          <ProgressBar percentage={getPercentage(base_stats.hp, getValueStats(base_stats, 31, 252, 100, true, 1.1).maxStat) }/>
        </div>
        <div>
          <p>Attack</p>
          <p>{base_stats.attack}</p>
          <ProgressBar percentage={getPercentage(base_stats.attack, getValueStats(base_stats, 31, 252, 100, true, 1.1).maxStat) }/>
        </div>
        <div>
          <p>Defense</p>
          <p>{base_stats.defense}</p>
          <ProgressBar percentage={getPercentage(base_stats.defense, getValueStats(base_stats, 31, 252, 100, true, 1.1).maxStat) }/>
        </div>
        <div>
          <p>Special ATK</p>
          <p>{base_stats.specialAtk}</p>
          <ProgressBar percentage={getPercentage(base_stats.specialAtk, getValueStats(base_stats, 31, 252, 100, true, 1.1).maxStat) }/>
        </div>
        <div>
          <p>Special DEF</p>
          <p>{base_stats.specialDef}</p>
          <ProgressBar percentage={getPercentage(base_stats.specialDef, getValueStats(base_stats, 31, 252, 100, true, 1.1).maxStat) }/>
        </div>
        <div>
          <p>Speed</p>
          <p>{base_stats.speed}</p>
          <ProgressBar percentage={getPercentage(base_stats.speed, getValueStats(base_stats, 31, 252, 100, true, 1.1).maxStat) }/>
        </div>
      </TextInfo>
    </div>
  )
}

export default StatsAndBattleInfo