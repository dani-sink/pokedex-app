import React from 'react'
import './DropdownContent.css'

const DropdownContent = ({children, open}) => {
  return (
    <div className={`dropdown-content ${open ? "open-content" : null }`} >{children}</div>
  )
}

export default DropdownContent