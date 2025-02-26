import React, { useState } from 'react'
import './TypeButton.css'
import classnames from "classnames"
import { useSearchParams } from 'react-router-dom'

const TypeButton = ({pokeType, typesSelected, setTypesSelected}) => {

  const [on, setOn] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const typeClass = 'type-btn'
  const colorClass = `type-btn-${pokeType.toLowerCase()}`


  const typeFilter = searchParams.getAll('type')
  let allClasses = ""
  if (typeFilter.length !== 0) {
    allClasses = typeFilter.some(typePoke => typePoke === pokeType.toLowerCase()) ? classnames(typeClass, colorClass) : classnames(typeClass)

  }

  return (
    <div className={allClasses !== "" ? allClasses : 'type-btn'} onClick={(e) => {
      if (e.target.classList.contains(`type-btn-${pokeType.toLowerCase()}`)){
        e.target.classList.remove(`type-btn-${pokeType.toLowerCase()}`) 
        setOn(false)
        setTypesSelected(prevVal => {
          // console.log(prevVal)
          const newObj = {...prevVal}
          delete newObj[`${pokeType.toLowerCase()}`]
          return {...newObj};
        })
      }else{
        e.target.classList.add(`type-btn-${pokeType.toLowerCase()}`)
        setOn(true)
        setTypesSelected(prevVal => {
            const newObj = {...prevVal}
            newObj[`${pokeType.toLowerCase()}`] = "on"
          return {...newObj};
        })
      }
      
      
    }}>
      {pokeType}
    </div>
  )
}

export default TypeButton   