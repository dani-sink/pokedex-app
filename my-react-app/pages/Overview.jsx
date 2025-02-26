import React, { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import TextInfo from '../components/TextInfo/TextInfo'
import './Overview.css'
import TypeIcon from '../components/Type/TypeIcon'
import PieChartComp from '../components/PieChart/PieChartComp'
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import Dropdown from '../components/Dropdown/Dropdown'
import Tooltip from '../components/Tooltip/Tooltip'
import { RiInformationLine, RiInformationFill } from "react-icons/ri";


const Overview = () => {
    const { pokemon, pokemonSpecies, pokemonAbilities } = useOutletContext()
    const [currentAudio, setCurrentAudio] = useState(null)

    const capitalize = s => s && String(s[0]).toUpperCase() + String(s).slice(1)

    const getPokemonGenus = (pokemonSpeciesData) => {
      const genusEntry = pokemonSpeciesData?.genera?.find(entry => entry?.language?.name === "en");

      return genusEntry ? genusEntry.genus : "Unknown"
    }

    const getPokemonDescription = (pokeSpeciesData) => {
      const flavorEntry = pokeSpeciesData.flavor_text_entries.find(entry => entry.language.name === "en")
  
      return flavorEntry ? flavorEntry.flavor_text.replace(/\s+/g,' ').replace('POKéMON', 'POKÉMON') : "Description not found"
    }

    const convertHeight = (height) => {
      const INCHES_PER_DM = 3.93701;
      const heightInInches = height * INCHES_PER_DM;

      const heightInFeet = Math.floor(heightInInches / 12);
      const remainingInches = Math.floor(heightInInches % 12);
  
      return `${heightInFeet}'${remainingInches}`
    }

    const convertWeight = (weight) => {
      const weightInPounds = (weight * 0.220462).toFixed(1);
      return `${weightInPounds} lbs`
    }
    

    const getGenderRate = (genderRate) => {
      let genderInfo;
      if (genderRate === -1) {
        genderInfo = (
          <p>Genderless</p>
        )
      } else {
        const femalePercentage = (genderRate / 8) * 100
        const malePercentage = 100 - femalePercentage
        genderInfo = (
          <PieChartComp 
            malePercentage={malePercentage} 
            femalePercentage={femalePercentage}
          />
        )
      }
      return genderInfo
    }
    

    const playCryAudio = (cry) => {
      if (currentAudio && !currentAudio.ended) {
        return
      }
      let audio = new Audio(cry)
      setCurrentAudio(audio)
      audio.play()
      audio.onended = () => {
        setCurrentAudio(null)
      }
    }

    const getAbilityFlavorText = (ability) => {
      const englishFlavorTexts = ability.flavor_text_entries.filter(entry => entry.language.name === 'en')
      const numTexts = englishFlavorTexts.length
      const latestFlavorText = numTexts > 0 ? englishFlavorTexts[numTexts - 1].flavor_text : "No description available";
      return latestFlavorText
    }

    const getAbilityShortEffectText = (ability) => {
      const englishEffectText = ability.effect_entries.filter((entry) => entry.language.name === 'en');
      const abilityEffect = englishEffectText.length > 0 ? englishEffectText[0].short_effect : "No effect available";
      return abilityEffect
    }

    const getAbilityEffectText = (ability) => {
      const englishEffectText = ability.effect_entries.filter((entry) => entry.language.name === 'en');
      const abilityEffect = englishEffectText.length > 0 ? englishEffectText[0].effect : "No effect available";
      return abilityEffect
    }

    const isHidden = (abilityName) => {
      const ability = pokemon.abilities.find(entry => entry.ability.name === abilityName)
      return ability.is_hidden;
    }

 
  return (
    <div className='overview-container' >
      <div className='overview-item item-1'>
        <TextInfo title={'Species'} width={'80%'} height={'80%'}>
          <div className='pokemon-overview-content-container'>
            <h1>{getPokemonGenus(pokemonSpecies)}</h1>
            <h3>{getPokemonDescription(pokemonSpecies)}</h3>
            <div className='pokemon-overview-type-details-container'>
              {
                pokemon
                .types
                ?.map(item => ( <TypeIcon key={item.slot} type={item.type.name} details={true} />))
              }
            </div>
            <table className='pokemon-overview-table' >
              <thead>
                <tr>
                  <th>Height</th>
                  <th>Gender</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>{convertHeight(pokemon.height)}</p>
                  </td>
                  <td>{getGenderRate(pokemonSpecies.gender_rate)}</td>
                  <td>
                    <p>{convertWeight(pokemon.weight)}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='cry-container'>
              {
              currentAudio !== null ? 
              <FaCirclePause className='play-pause-icon' color='#b22222' onClick={() => playCryAudio(pokemon.cries?.latest)} />
              :
              <FaCirclePlay className='play-pause-icon' color='#b22222' onClick={() => playCryAudio(pokemon.cries?.latest)} />
              }
              <h2>Cry</h2>
            </div>
          </div>
        </TextInfo>
      </div>
      <div 
        className='overview-item item-2'
        
      >
        <TextInfo title={'Abilities'} width={'90%'} height={'90%'} color={'#F0EDEE'}>
          <div className='pokemon-abilities-top-section-container'>
            <div className='pokemon-ability-description-container'>
              <h4>A Pokemon's Ability provides them with a passive effect in battle or in the overworld.</h4>
            </div>
            <div className='abilities-count-and-tooltip'>
              <h3>{`Abilities : ${pokemonAbilities.length}`}</h3>
              <Tooltip 
              text={
                <ul className='tooltip-list'>
                  <li>A Pokemon can have as much as three Abilities but can only use one Ability at a time during a battle.</li>
                </ul>
              }
              >
                <RiInformationLine className='information-icon'/>
              </Tooltip>
              
            </div>
          </div>
          <div className='pokemon-abilities-container'>
            {
              pokemonAbilities.map((ability, index) => 
                <div 
                  key={ability.name} 
                  className='pokemon-ability-name-and-details-container'
                  style={
                    index === 0 ? {borderTop: '2px solid #b22222'} 
                  : index === pokemonAbilities.length - 1 ? {borderBottom: 'none'}  : null
                }
                >
                  <div className='pokemon-ability-title-container'>
                      { isHidden(ability.name) 
                      ?
                        (
                          <div className='hidden-ability-name-container'>
                            <p>{`${capitalize(ability.name)} ( Hidden )`}</p>
                            <RiInformationFill className='hidden-ability-icon'/>
                          </div>
                          
                        )
                      : <p>{capitalize(ability.name)}</p>  
                      }

                  </div>
                  <div className='pokemon-flavor-text-container'>
                    <p>{getAbilityFlavorText(ability)}</p>
                    {isHidden(ability.name) ? 
                    <div className='hidden-ability-icon-note-container'>
                      <RiInformationFill className='hidden-ability-icon-note'/>
                      <p className='hidden-note' >A Hidden Ability is a rare Ability that a Pokémon does not normally have access to.</p> 
                    </div>
                    : null}

                  </div>
                  <div>
                    <Dropdown 
                      buttonText={'Details'}
                      content={
                        (
                          <div className='pokemon-abilities-details-container'>
                            <div className='pokemon-ability-attribute-container'>
                              <h3>Short Effect</h3>
                              <p className='effect-text' >{getAbilityShortEffectText(ability)}</p>
                            </div>
                            <div className='pokemon-ability-attribute-container'>
                              <h3>Detailed Effect</h3>
                              <p className='effect-text' >{getAbilityEffectText(ability)}</p>
                            </div>
                          </div>
                        )
                      }
                    ></Dropdown>
                  </div>
                </div>
              )
            }
          </div>
          
        </TextInfo>
      </div>
      <div className='overview-item item-3'></div>
      <div className='overview-item item-4'></div>
      <div className='overview-item item-5'></div>
      
    </div>
  )
}

export default Overview