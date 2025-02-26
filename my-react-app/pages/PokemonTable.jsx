import { useContext, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom";
import TypeIcon from "../components/Type/TypeIcon";
import './Pokedex.css'
import { ThemeContext } from "../src/App";
import { GoFilter } from "react-icons/go";
import { FaSortUp, FaSortDown } from "react-icons/fa6";
import './PokemonTable.css'


export default function PokemonTable({ pokemonsData }){

    const [sortedSetting, setSortedSetting] = useState(null)
    const [searchData, setSearchData] = useState("")
    const [sortedAttribute, setSortedAttribute] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const {setOpenModal} = useContext(ThemeContext)

    
    const capitalize = s => s && String(s[0]).toUpperCase() + String(s).slice(1)
    const sortAttribute = name => {
        let direction = 'ascending';
        if (sortedSetting && sortedSetting.name === name && sortedSetting.direction === 'ascending'){
            direction = 'descending';
        }
        const obj = {}
        obj["name"] = `${name}`
        obj["direction"] = direction
        setSortedAttribute({...obj})
        setSortedSetting({name, direction})
    }

    const typeFilter = searchParams.getAll('type')

    
    let sortedElements = pokemonsData !== null ? 
    typeFilter.length !== 0 ? [...pokemonsData].filter(pokemon => pokemon.types.some(typeObj => typeFilter.some(typePoke => typePoke === typeObj.type.name))) : [...pokemonsData]
    : [];
    useMemo(() => {
        if (sortedSetting !== null) {
            if (sortedSetting.name == 'name' || sortedSetting.name == 'id' || sortedSetting.name == 'height'){
                sortedElements.sort((a, b) => {
                    if (a[sortedSetting.name] < b[sortedSetting.name]){
                        return sortedSetting.direction === 'ascending' ? -1 : 1;
                    } else if (a[sortedSetting.name] > b[sortedSetting.name]){
                        return sortedSetting.direction === 'ascending' ? 1 : -1;
                    } else {
                        return 0;
                    }
                })
            } else {
                switch (sortedSetting.name) {
                    case 'hp':
                        sortedElements.sort((a, b) => {
                            if (a.stats[0].base_stat < b.stats[0].base_stat){
                                return sortedSetting.direction === 'ascending' ? -1 : 1;
                            } else if (a.stats[0].base_stat > b.stats[0].base_stat) {
                                return sortedSetting.direction === 'ascending' ? 1 : -1;
                            } else {
                                return 0;
                            }
                        })
                        break;
                    case 'attack':
                        sortedElements.sort((a, b) => {
                            if (a.stats[1].base_stat < b.stats[1].base_stat){
                                return sortedSetting.direction === 'ascending' ? -1 : 1;
                            } else if (a.stats[1].base_stat > b.stats[1].base_stat) {
                                return sortedSetting.direction === 'ascending' ? 1 : -1;
                            } else {
                                return 0;
                            }
                        })
                        break;
                    case 'defense':
                        sortedElements.sort((a, b) => {
                            if (a.stats[2].base_stat < b.stats[2].base_stat){
                                return sortedSetting.direction === 'ascending' ? -1 : 1;
                            } else if (a.stats[2].base_stat > b.stats[2].base_stat) {
                                return sortedSetting.direction === 'ascending' ? 1 : -1;
                            } else {
                                return 0;
                            }
                        })
                        break;
                    case 'spe_atk':
                        sortedElements.sort((a, b) => {
                            if (a.stats[3].base_stat < b.stats[3].base_stat){
                                return sortedSetting.direction === 'ascending' ? -1 : 1;
                            } else if (a.stats[3].base_stat > b.stats[3].base_stat) {
                                return sortedSetting.direction === 'ascending' ? 1 : -1;
                            } else {
                                return 0;
                            }
                        })
                        break;
                    case 'spe_def':
                        sortedElements.sort((a, b) => {
                            if (a.stats[4].base_stat < b.stats[4].base_stat){
                                return sortedSetting.direction === 'ascending' ? -1 : 1;
                            } else if (a.stats[4].base_stat > b.stats[4].base_stat) {
                                return sortedSetting.direction === 'ascending' ? 1 : -1;
                            } else {
                                return 0;
                            }
                        })
                        break;
                    case 'speed':
                        sortedElements.sort((a, b) => {
                            if (a.stats[5].base_stat < b.stats[5].base_stat){
                                return sortedSetting.direction === 'ascending' ? -1 : 1;
                            } else if (a.stats[5].base_stat > b.stats[5].base_stat) {
                                return sortedSetting.direction === 'ascending' ? 1 : -1;
                            } else {
                                return 0;
                            }
                        })
                        break;
                    
                    default:
                        console.log('Unknown attribute')
                }
            }
        }
    }, [pokemonsData, sortedSetting])

    const pokemonComponents = sortedElements !== null ? sortedElements.filter(pokemon => {
        return searchData.toLowerCase() === '' ? pokemon : pokemon.name.toLowerCase().includes(searchData.toLowerCase())
    }).map(pokemon => (
        <tr key={pokemon.id}>
            <td>
                <img src={pokemon.sprites?.front_default} alt={pokemon.name}/>
            </td>
            <td>{pokemon.id}</td>
            <td>
                <Link to={`/pokedex/${pokemon.name}`} >
                    {capitalize(pokemon.name)}
                </Link>
            </td>
            <td>
                {pokemon.types?.map(item => (
                    <TypeIcon key={item.slot} type={item.type.name} details={false} />
                ))}
            </td>
            <td>{pokemon.stats[0]?.base_stat}</td>
            <td>{pokemon.stats[1]?.base_stat}</td>
            <td>{pokemon.stats[2]?.base_stat}</td>
            <td>{pokemon.stats[3]?.base_stat}</td>
            <td>{pokemon.stats[4]?.base_stat}</td>
            <td>{pokemon.stats[5]?.base_stat}</td>
            <td>{pokemon.height}</td>
        </tr>
    )) : [];


    return (
        <div className="pokedex-container">
            <>
                <div className="name-and-filters">
                    <label className="custom-field black">
                        <input className="pokemon-name" required type="text" maxLength="15" onChange={(e) => setSearchData(e.target.value)} />
                        <span className="placeholder" >Name</span>
                    </label>

                    <label className="filter-container">    
                        <GoFilter  title="Type Filters" aria-label="Type Filters" className="filter-icon" onClick={() => {
                            setOpenModal(true)
                            const overlay = document.getElementById('overlay')
                            const header = document.getElementById('header-component')
                            console.log(header)
                            header.classList.add('remove-header')
                            overlay.style.display = "block"
                            document.body.classList.add('modal-opened')
                        }}
                        />
                        <span className="icon-text-placeholder">Type Filters</span>
                    </label>
                    
                </div>
            </>
            <table className="pokedex-table">
                <thead>
                    <tr>
                        <th className="table-header" >Appearance</th>
                        <th className={`table-header ${sortedAttribute && sortedAttribute.name === 'id' ? 'chosen-attribute' : ""}`}>
                            <div className="sorted-attribute" type="button" onClick={() => sortAttribute('id')}>
                                <span>Number</span>
                                {
                                    sortedAttribute && sortedAttribute.name === 'id' ?
                                    (
                                    <>
                                        {<FaSortUp className={`sort-down ${sortedAttribute.direction === 'descending' ? 'show-sort-up' : ""}`}/>}
                                        {<FaSortDown className={`sort-up ${sortedAttribute.direction === 'ascending' ? 'show-sort-down' : ""}`}/>}

                                    </>
                                    ) :
                                    (
                                        <>
                                            <FaSortUp className="sort-down"/>
                                            <FaSortDown className="sort-up"/>
                                        </>
                                    )
                                }
                            </div>
                        </th>
                        <th className={`table-header ${sortedAttribute && sortedAttribute.name === 'name' ? 'chosen-attribute' : ""}`}>
                            <div className="sorted-attribute" type="button" onClick={() => sortAttribute('name')}>
                                <span>Name</span>
                                {
                                    sortedAttribute && sortedAttribute.name === 'name' ?
                                    (
                                    <>
                                        {<FaSortUp className={`sort-down ${sortedAttribute.direction === 'descending' ? 'show-sort-up' : ""}`}/>}
                                        {<FaSortDown className={`sort-up ${sortedAttribute.direction === 'ascending' ? 'show-sort-down' : ""}`}/>}

                                    </>
                                    ) :
                                    (
                                        <>
                                            <FaSortUp className="sort-down"/>
                                            <FaSortDown className="sort-up"/>
                                        </>
                                    )
                                }
                            </div>
                        </th>
                        <th className="table-header">Type</th>
                        <th className={`table-header ${sortedAttribute && sortedAttribute.name === 'hp' ? 'chosen-attribute' : ""}`}>
                            <div className="sorted-attribute" type="button" onClick={() => sortAttribute('hp')}>
                                <span>HP</span>
                                {
                                    sortedAttribute && sortedAttribute.name === 'hp' ?
                                    (
                                    <>
                                        {<FaSortUp className={`sort-down ${sortedAttribute.direction === 'descending' ? 'show-sort-up' : ""}`}/>}
                                        {<FaSortDown className={`sort-up ${sortedAttribute.direction === 'ascending' ? 'show-sort-down' : ""}`}/>}

                                    </>
                                    ) :
                                    (
                                        <>
                                            <FaSortUp className="sort-down"/>
                                            <FaSortDown className="sort-up"/>
                                        </>
                                    )
                                }
                            </div>
                        </th>
                        <th className={`table-header ${sortedAttribute && sortedAttribute.name === 'attack' ? 'chosen-attribute' : ""}`} >
                            <div  className="sorted-attribute" type="button" onClick={() => sortAttribute('attack')}>
                                <span>Attack</span>
                                {
                                    sortedAttribute && sortedAttribute.name === 'attack' ?
                                    (
                                    <>
                                        {<FaSortUp className={`sort-down ${sortedAttribute.direction === 'descending' ? 'show-sort-up' : ""}`}/>}
                                        {<FaSortDown className={`sort-up ${sortedAttribute.direction === 'ascending' ? 'show-sort-down' : ""}`}/>}

                                    </>
                                    ) :
                                    (
                                        <>
                                            <FaSortUp className="sort-down"/>
                                            <FaSortDown className="sort-up"/>
                                        </>
                                    )
                                }
                            </div>
                        </th>
                        <th className={`table-header ${sortedAttribute && sortedAttribute.name === 'defense' ? 'chosen-attribute' : ""}`}>
                            <div className="sorted-attribute" type="button" onClick={() => sortAttribute('defense')}>
                                <span>Defense</span>
                                {
                                    sortedAttribute && sortedAttribute.name === 'defense' ?
                                    (
                                    <>
                                        {<FaSortUp className={`sort-down ${sortedAttribute.direction === 'descending' ? 'show-sort-up' : ""}`}/>}
                                        {<FaSortDown className={`sort-up ${sortedAttribute.direction === 'ascending' ? 'show-sort-down' : ""}`}/>}

                                    </>
                                    ) :
                                    (
                                        <>
                                            <FaSortUp className="sort-down"/>
                                            <FaSortDown className="sort-up"/>
                                        </>
                                    )
                                }
                            </div>
                        </th>
                        <th className={`table-header ${sortedAttribute && sortedAttribute.name === 'spe_atk' ? 'chosen-attribute' : ""}`}>
                            <div className="sorted-attribute" type="button" onClick={() => sortAttribute('spe_atk')}>
                                <span>Special ATK</span>
                                {
                                    sortedAttribute && sortedAttribute.name === 'spe_atk' ?
                                    (
                                    <>
                                        {<FaSortUp className={`sort-down ${sortedAttribute.direction === 'descending' ? 'show-sort-up' : ""}`}/>}
                                        {<FaSortDown className={`sort-up ${sortedAttribute.direction === 'ascending' ? 'show-sort-down' : ""}`}/>}

                                    </>
                                    ) :
                                    (
                                        <>
                                            <FaSortUp className="sort-down"/>
                                            <FaSortDown className="sort-up"/>
                                        </>
                                    )
                                }
                            </div>
                        </th>
                        <th className={`table-header ${sortedAttribute && sortedAttribute.name === 'spe_def' ? 'chosen-attribute' : ""}`}>
                            <div className="sorted-attribute" type="button" onClick={() => sortAttribute('spe_def')}>
                                <span>Special DEF</span>
                                {
                                    sortedAttribute && sortedAttribute.name === 'spe_def' ?
                                    (
                                    <>
                                        {<FaSortUp className={`sort-down ${sortedAttribute.direction === 'descending' ? 'show-sort-up' : ""}`}/>}
                                        {<FaSortDown className={`sort-up ${sortedAttribute.direction === 'ascending' ? 'show-sort-down' : ""}`}/>}

                                    </>
                                    ) :
                                    (
                                        <>
                                            <FaSortUp className="sort-down"/>
                                            <FaSortDown className="sort-up"/>
                                        </>
                                    )
                                }
                            </div>
                        </th>
                        <th className={`table-header ${sortedAttribute && sortedAttribute.name === 'speed' ? 'chosen-attribute' : ""}`}>
                            <div className="sorted-attribute" type="button" onClick={() => sortAttribute('speed')}>
                                <span>Speed</span>
                                {
                                    sortedAttribute && sortedAttribute.name === 'speed' ?
                                    (
                                    <>
                                        {<FaSortUp className={`sort-down ${sortedAttribute.direction === 'descending' ? 'show-sort-up' : ""}`}/>}
                                        {<FaSortDown className={`sort-up ${sortedAttribute.direction === 'ascending' ? 'show-sort-down' : ""}`}/>}

                                    </>
                                    ) :
                                    (
                                        <>
                                            <FaSortUp className="sort-down"/>
                                            <FaSortDown className="sort-up"/>
                                        </>
                                    )
                                }
                            </div>
                        </th>
                        <th className={`table-header ${sortedAttribute && sortedAttribute.name === 'height' ? 'chosen-attribute' : ""}`}>
                            <div className="sorted-attribute" type="button" onClick={() => sortAttribute('height')}>
                                <span>Height</span>
                                {
                                    sortedAttribute && sortedAttribute.name === 'height' ?
                                    (
                                    <>
                                        {<FaSortUp className={`sort-down ${sortedAttribute.direction === 'descending' ? 'show-sort-up' : ""}`}/>}
                                        {<FaSortDown className={`sort-up ${sortedAttribute.direction === 'ascending' ? 'show-sort-down' : ""}`}/>}

                                    </>
                                    ) :
                                    (
                                        <>
                                            <FaSortUp className="sort-down"/>
                                            <FaSortDown className="sort-up"/>
                                        </>
                                    )
                                }
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pokemonComponents}
                </tbody>
            </table>
        </div>
    )
    
    
}