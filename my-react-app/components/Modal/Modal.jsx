import { useContext, useState } from "react"
import { ThemeContext } from "../../src/App"
import { useSearchParams } from "react-router-dom"
import Dropdown from "../Dropdown/Dropdown"
import DropdownItem from "../DropdownItem/DropdownItem"
import TypeButton from "../Type/TypeButton"
import './Modal.css'

export default function Modal(){

    const { setOpenModal } = useContext(ThemeContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const setTypes = (obj) => {
        const newObj = {...obj}
        const newTypeFilter = searchParams.getAll('type')
        newTypeFilter.forEach(curType => {
            newObj[curType] = "on"
        })
        return newObj;
    }

    const [typesSelected, setTypesSelected] = useState(searchParams.size !== 0 ? setTypes({}) : {} )
    const types = [
        "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", 
        "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", 
        "Dragon", "Dark", "Steel", "Fairy"
      ];

    return (
        <div className="modal-background">
            <div className="modal-container" id="modal-container" >
                <button onClick={() => {
                    const overlay = document.getElementById('overlay')
                    overlay.style.display = "none"
                    setOpenModal(false)
                    const header = document.getElementById('header-component')
                    header.classList.remove('remove-header')
                    document.body.classList.remove('modal-opened')
                    }} 
                >
                    X
                </button>
                <div className="modal-content">
                    <div className="modal-title" >
                        <h1>Search Filters</h1>
                    </div>
                    <div className="modal-body" >
                        <Dropdown
                            buttonText="Select Type"
                            content={
                            <div className="items-container">
                                {types.map(type => (
                                    <DropdownItem key={type}>
                                        <TypeButton pokeType={type} typesSelected={typesSelected} setTypesSelected={setTypesSelected} />
                                    </DropdownItem>
                                ))}
                            </div> 
                            }
                        />
                    </div>
                    <div className="modal-footer" >
                        <button className="clear-all-btn"
                        onClick={() => {
                            setTypesSelected({});
                            setSearchParams("");
                            const overlay = document.getElementById('overlay')
                            overlay.style.display = "none"
                            const header = document.getElementById('header-component')
                            header.classList.remove('remove-header')
                            setOpenModal(false)
                            document.body.classList.remove('modal-opened') 
                        }}
                        >
                            CLEAR ALL
                        </button>
                        <button className="apply-filters-btn" onClick={() => {
                            if (Object.keys(typesSelected).length !== 0) {
                                const keys = Object.keys(typesSelected)
                                let newStr = ""
                                for (let i = 0; i < keys.length; ++i) {
                                    if (i !== keys.length - 1) {
                                        newStr += 'type=' + keys[i] + '&'
                                    } else {
                                        newStr += 'type=' + keys[i]
                                    }
                                }

                                setSearchParams(newStr)
                            } else {
                                setSearchParams("")
                            }
                            const overlay = document.getElementById('overlay')
                            overlay.style.display = "none"
                            const header = document.getElementById('header-component')
                            header.classList.remove('remove-header')
                            setOpenModal(false)
                            document.body.classList.remove('modal-opened')
                        }}
                        >
                            APPLY FILTERS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}