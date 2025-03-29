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
import PokeBallImg from '../src/images/poke-ball.png'
import GreatBallImg from '../src/images/great-ball.png'
import UltraBallImg from '../src/images/ultra-ball.png'


const eggGroupDescriptions = {
  "Monster": "Pokémon in this group are saurian or kaiju-like in appearance and nature.",
  "Water 1": "This group consists of amphibious Pokémon, often capable of both land-based and aquatic locomotion.",
  "Bug": "Comprising insectoid Pokémon, this group includes species resembling insects and similar arthropods.",
  "Flying": "Members are avian Pokémon, typically based on birds and other flying creatures.",
  "Field": "The largest Egg Group, containing a wide variety of terrestrial Pokémon.",
  "Fairy": "This group includes petite and cute Pokémon, many of which are Fairy-type.",
  "Grass": "Composed of plant-like Pokémon, most members are Grass-type.",
  "Plant": "Composed of plant-like Pokémon, most members are Grass-type.",
  "Human-Like": "Featuring fully bipedal humanoid Pokémon.",
  "Water 3": "Members resemble aquatic invertebrates, with many being Water-type.",
  "Mineral": "This group consists of inorganic Pokémon, often with rocky or metallic bodies.",
  "Amorphous": "Comprising Pokémon with no definite form.",
  "Water 2": "Members are piscine (fish-like) Pokémon.",
  "Ditto": "Ditto is the sole member of this group, capable of breeding with almost any Pokémon.",
  "Dragon": "Featuring reptilian or draconic Pokémon.",
  "No Eggs Discovered": "This group includes Pokémon that cannot breed, such as baby and Legendary Pokémon."
};


const Overview = () => {
    const { pokemon, pokemonSpecies, pokemonAbilities } = useOutletContext()
    const [currentAudio, setCurrentAudio] = useState(null)

    const capitalize = s => s && String(s[0]).toUpperCase() + String(s).slice(1)
    const formatAbility = (str) => str.split(/[-\s]+/).map(word => capitalize(word)).join(' ');

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

    const getPokemonHP = (poke, level) => {
     const pokeBaseHP = poke.stats[0].base_stat;
     const EV = 0;
     const IV = 0;
     return Math.floor(0.01 * (2 * pokeBaseHP + IV + Math.floor(0.25 * EV)) * level) + level + 10;
    }

    const getCaptureRate = (hp, catchRate, ballType) => {
      let ballBonus = 1;
      if (ballType === 'great ball') {
        ballBonus = 1.5
      } 
      else if ( ballType === 'ultra ball') {
        ballBonus = 2
      } 

      /* 
        Assumptions for this sample:
          . The pokemon is at level 61+
          . The Individual value (IV) is 0.
          . The Effort Value (EV) is 0.
          . The pokemon is at Full Health with no status impairment such as Paralysis, Poison or Sleep.
          . No Dark Grass ==> G = 1.
          . We are catching the pokemon at lvl 61 with 0 badges, meaning the highest badge penalty possible.
          . Since the pokemon is at level 61+, no Low-Level Modifier is applied.
          . We use the default Difficulty Modifier.
          . The Pokedex modifier is set to 0.
          . No Catching Charm item
      */

      let darkGrass = 1;
      let badgePenalty = Math.pow(0.8, 8)
      let low_level_modifier = 1;
      let status = 1;
      let difficulty_modifier = 1;
      let pokedex_modifier = 0;
      let catching_charm = 1


      const captureRate = 
        Math.abs(((3 * hp - 2 * hp) * darkGrass * catchRate * ballBonus * badgePenalty ) / (3 * hp)) 
        * (low_level_modifier * status * difficulty_modifier)

      const criticalCaptureRate = Math.abs(Math.min(255, captureRate) * pokedex_modifier * catching_charm / 6 )

      let Y = Math.abs(65536 / (Math.pow(255/captureRate, 3/16)))
      let probability_of_capture = Math.pow(Y / 65536, 4)
      let final_capture_chance = probability_of_capture * 100
      return final_capture_chance.toFixed(2)
    }

    const getEffortValueYield = (poke) => {
      let EV_arr = []
      poke.stats.forEach((entry) => {
        if (entry.effort > 0) {
          let name_stat = ""
          switch(entry.stat.name) {
            case 'hp':
              name_stat = "HP";
              break;
            case 'attack':
              name_stat = "Attack";
              break;
            case 'defense':
              name_stat = "Defense";
              break;
            case 'special-attack':
              name_stat = "Sp. ATK";
              break;
            case 'special-defense':
              name_stat = "Sp. DEF";
              break;
            case 'speed':
              name_stat = "Speed";
              break;
            default:
              name_stat = ""
          }
          EV_arr.push({name: name_stat, value: entry.effort})
        }
      })
      return EV_arr;
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
                            <p>{`${formatAbility(ability.name)} ( Hidden )`}</p>
                            <RiInformationFill className='hidden-ability-icon'/>
                          </div>
                          
                        )
                      : <p>{formatAbility(ability.name)}</p>  
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
      <div className='overview-item item-3'>
        <TextInfo title={'Catch Rate'} width={'90%'} height={'90%'} color={'#F0EDEE'}>
          <div className='catch-rate-container'>
            <div className='catch-rate-top-text-container'>
              <p>When a Poké Ball is thrown at a wild Pokémon, the game computes the Pokémon's catch rate 
                and uses it in a formula to determine the chances of catching that Pokémon. To see how the catch rate is determined, <a href="">click here.</a>
              </p>
            </div>
            <div className='catch-rate-midsection-container'>
              
              <p className='pokeball-example-text' >For example, the chances of catching {capitalize(pokemon.name)} on the first attempt with a Poke Ball, Great Ball and Ultra Ball respectively:</p>
            
              <div className='pokeball-catch-rates-container' >
                <div className='pokeball-img-and-percentage-container' >
                  <img className='pokeball-img' src={PokeBallImg} />
                  <div className='pokeball-percentage-container'>
                    <p>{`${getCaptureRate(getPokemonHP(pokemon, 61), pokemonSpecies.capture_rate, 'poke ball')} %`}</p>
                  </div>
                </div>
                <div className='pokeball-img-and-percentage-container'>
                  <img className='pokeball-img' src={GreatBallImg} />
                  <div className='pokeball-percentage-container'>
                    <p>{`${getCaptureRate(getPokemonHP(pokemon, 61), pokemonSpecies.capture_rate, 'great ball')} %`}</p>
                  </div>
                </div>
                <div className='pokeball-img-and-percentage-container'>
                  <img className='pokeball-img' src={UltraBallImg} />
                  <div className='pokeball-percentage-container'>
                    <p>{`${getCaptureRate(getPokemonHP(pokemon, 61), pokemonSpecies.capture_rate, 'ultra ball')} %`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='catch-rate-bottom-section-container'>
              <p className='catch-rate-bottom-text'>
                Chances of capture are determined using the same algorithm as the one used in the current latest generation, Gen IX. 
                To obtain these results, we created a sample situation with various assumptions such as the Pokemon's current level or the Trainer's 
                Badge Penalty. To create your own sample, click <a href="">Here.</a> 
              </p>
            </div>
          </div>
        </TextInfo>
      </div>
      <div className='overview-item item-4'>
        <TextInfo title={'Training'} width={'50%'} height={'85%'} color={'#fff'}>
          <div className='training-table-container'>
            <table className='training-table'>
              <tr>
                <th>Base Exp</th>
                <td>{pokemon.base_experience}</td>
              </tr>
              <tr>
                <th>Base Friendship</th>
                <td>{pokemonSpecies.base_happiness}</td>
              </tr>
              <tr>
                <th>EV yield</th>
                <td>
                  <ul>
                    {getEffortValueYield(pokemon).map(entry => {
                      return <li>{`${entry.value} ${entry.name}`}</li>
                    })}
                  </ul>
                </td>
              </tr>
              <tr id='training-table-last-row'>
                <th>Growth Rate</th>
                <td>{formatAbility(pokemonSpecies.growth_rate.name)}</td>
              </tr>
            </table>
          </div>
        </TextInfo>
        
      </div>
      <div className='overview-item item-5'>
        <TextInfo title={'Breeding'} width={'80%'} height={'85%'} color={'#fff'}>
            <div>
              <h3>Egg Groups</h3>
              {pokemonSpecies.egg_groups.map(entry => {
                return (<div>
                    <div>
                      <h4>{capitalize(entry.name)}:</h4>
                      <p>{eggGroupDescriptions[capitalize(entry.name)]}</p>
                    </div>
                  </div>)
              })}
            </div>
            <div>
              <h3>Egg Cycles:</h3>
              <p>{pokemonSpecies.hatch_counter}</p>
            </div>
        </TextInfo>
      </div>
      
    </div>
  )
}

export default Overview