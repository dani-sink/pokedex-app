import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import TextInfo from '../components/TextInfo/TextInfo'
import ProgressBar from '../components/ProgressBar/ProgressBar'
import './StatsAndBattleInfo.css'

const StatsAndBattleInfo = () => {
    const { pokemon, pokemonSpecies } = useOutletContext()
    const [statType, setStatType] = useState("base")
    const base_stats = {
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      specialAtk: pokemon.stats[3].base_stat,
      specialDef: pokemon.stats[4].base_stat,
      speed: pokemon.stats[5].base_stat
    }

    base_stats.total = Object.values(base_stats).reduce((acc, cur) => acc + cur, 0)

    const getMax = (arr) => {
      let curMax = -Infinity
      for (let val of arr) {
        if (val > curMax){
          curMax = val
        }
      }
      return curMax
    }

    const modifyStatType = (type) => {
      setStatType(type)
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
        levelHundredStatValues.total = Object.values(levelHundredStatValues).reduce((acc, cur) => acc + cur, 0)
        let {total, ...newObj} = levelHundredStatValues
        levelHundredStatValues.maxStat = getMax(Object.values({...newObj}))
      } else {
          levelHundredStatValues = {
            hp: Math.floor(Math.abs(((2 * baseStats.hp + IV + Math.abs(EV/4)) * 100)/100) + level + 10),
            attack:  Math.floor((Math.abs(((2 * baseStats.attack + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
            defense:  Math.floor((Math.abs(((2 * baseStats.defense + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
            specialAtk:  Math.floor((Math.abs(((2 * baseStats.specialAtk + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
            specialDef:  Math.floor((Math.abs(((2 * baseStats.specialDef + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
            speed:  Math.floor((Math.abs(((2 * baseStats.speed + IV + Math.abs(EV/4)) * 100)/100) + 5) * nature),
          }
          levelHundredStatValues.total = Object.values(levelHundredStatValues).reduce((acc, cur) => acc + cur, 0)
      }
      return levelHundredStatValues
    }

    const getPercentage = (curStat, maxStat) => Math.floor((curStat / maxStat) * 100)

  
  const minValObj = getValueStats(base_stats, 0, 0, 100, false, 0.9)
  const maxValObj = getValueStats(base_stats, 31, 252, 100, true, 1.1)
    
  return (
    <div>
      
      <TextInfo title={'All Stats'} width={'50%'} height={'auto'}>
      <div className='buttons-container'>
        <button className={`button-stats-mode ${statType === 'base' ? 'button-selected' : ""}`} onClick={() => modifyStatType('base')}>Base</button>
        <button className={`button-stats-mode ${statType === 'min' ? 'button-selected' : ""}`} onClick={() => modifyStatType('min')}>Min</button>
        <button className={`button-stats-mode ${statType === 'max' ? 'button-selected' : ""}`} onClick={() => modifyStatType('max')}>Max</button>
      </div>
        <table>
          <tbody>
            <tr>
              <td><p>HP</p></td>
              <td><ProgressBar 
              percentage=
              {
                getPercentage(
                  `${statType === 'base' ? base_stats.hp : statType === 'min' 
                    ? minValObj.hp : statType === 'max' 
                    ? maxValObj.hp : "" }`
              , maxValObj.maxStat) }/></td>
              <td><p>{
              `${statType === 'base' ? base_stats.hp : statType === 'min' 
                    ? minValObj.hp : statType === 'max' 
                    ? maxValObj.hp : "" }`
              }</p></td>
            </tr>
            <tr>
              <td><p>Attack</p></td>
              <td><ProgressBar 
              percentage={
                getPercentage(
                  `${statType === 'base' ? base_stats.attack : statType === 'min' 
                    ? minValObj.attack : statType === 'max' 
                    ? maxValObj.attack : "" }`
                  , maxValObj.maxStat) }/></td>
              <td><p>{
              `${statType === 'base' ? base_stats.attack : statType === 'min' 
                    ? minValObj.attack : statType === 'max' 
                    ? maxValObj.attack : "" }`
              }</p></td>
            </tr>
            <tr>
              <td><p>Defense</p></td>
              <td><ProgressBar 
              percentage={
                getPercentage(
                  `${statType === 'base' ? base_stats.defense : statType === 'min' 
                    ? minValObj.defense : statType === 'max' 
                    ? maxValObj.defense : "" }`
                  , maxValObj.maxStat) }/></td>
              <td><p>{
              `${statType === 'base' ? base_stats.defense : statType === 'min' 
                    ? minValObj.defense : statType === 'max' 
                    ? maxValObj.defense : "" }`
              }</p></td>
            </tr>
            <tr>
              <td><p>Special ATK</p></td>
              <td><ProgressBar 
              percentage={
                getPercentage(
                  `${statType === 'base' ? base_stats.specialAtk : statType === 'min' 
                    ? minValObj.specialAtk : statType === 'max' 
                    ? maxValObj.specialAtk : "" }`
                  , maxValObj.maxStat) }/></td>
              <td><p>{
              `${statType === 'base' ? base_stats.specialAtk : statType === 'min' 
                    ? minValObj.specialAtk : statType === 'max' 
                    ? maxValObj.specialAtk : "" }`
              }</p></td>
            </tr>
            <tr>
              <td><p>Special DEF</p></td>
              <td><ProgressBar 
              percentage={
                getPercentage(
                  `${statType === 'base' ? base_stats.specialDef : statType === 'min' 
                    ? minValObj.specialDef : statType === 'max' 
                    ? maxValObj.specialDef : "" }`
                  , maxValObj.maxStat) }/></td>
              <td><p>{
              `${statType === 'base' ? base_stats.specialDef : statType === 'min' 
                    ? minValObj.specialDef : statType === 'max' 
                    ? maxValObj.specialDef : "" }`
              }</p></td>
            </tr>
            <tr>
              <td><p>Speed</p></td>
              <td><ProgressBar 
              percentage={
                getPercentage(
                  `${statType === 'base' ? base_stats.speed : statType === 'min' 
                    ? minValObj.speed : statType === 'max' 
                    ? maxValObj.speed : "" }`
                  , maxValObj.maxStat) }/></td>
              <td><p>{
              `${statType === 'base' ? base_stats.speed : statType === 'min' 
                    ? minValObj.speed : statType === 'max' 
                    ? maxValObj.speed : "" }`
              }</p></td>
            </tr>
            <tr>
              <td></td>
              <td id='last-row-second-col'>Total:</td>
              <td>
              {statType === 'base' ? base_stats.total : 
              statType === 'min' ? minValObj.total : 
              statType === 'max' ? maxValObj.total : "" }
              </td>
            </tr>
          </tbody>
        </table>
        {
          statType === 'base' && 
          <p>
            A Pokemon's base stats range from values of 1 to 255, and are often the prime representation of the potential a Pokémon species has in battle
          </p>
        }
        {
          statType === 'min' && 
          <p>
            The minimum value refers to the lowest possible stats that a Pokemon can get depending on the level. Here, we assume the Pokemon is level 100 (max)
            with IVs and EVs equal to 0 and a hindering nature for the Pokemon.
          </p>
        }
        {
          statType === 'max' && 
          <p>
            The maximum value refers to the highest possible stats that a Pokemon can get depending on the level. Here, we assume the Pokemon is level 100 (max)
            with IVs and EVs equal to 31 and 252 and a favorable nature for the Pokemon.
          </p>
        }
        
      </TextInfo>
    </div>
  )
}

export default StatsAndBattleInfo