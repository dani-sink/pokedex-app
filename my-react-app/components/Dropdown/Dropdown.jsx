import React, { useState } from 'react'
import DropdownButton from '../DropdownButton/DropdownButton'
import DropdownContent from '../DropdownContent/DropdownContent'
import './Dropdown.css'

const Dropdown = ({buttonText, content}) => {
    const [open, setOpen] = useState(false)

    const toggleDropDown = () => {
        setOpen((opened) => !opened)
    }

    return (
        <div className='dropdown'>
            <DropdownButton toggle={toggleDropDown} open={open} >
                {buttonText}
            </DropdownButton>
            <DropdownContent open={open} >
                {content}
            </DropdownContent>
        </div>
    )
}

export default Dropdown