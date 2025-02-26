import React, { useState } from 'react'
import './Tooltip.css'

const Tooltip = ({text, children, hidden}) => {
    const [isShown, setIsShown] = useState(false)
  return (
    <div
        className={`tooltip-container ${hidden ? 'is_hidden' : ""}`}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
    >
        {children}
        { 
            isShown 
            &&
            <div className={`tooltip ${hidden ? 'hidden' : ""}`}>
                {text}
            </div>
        }
    </div>
  )
}

export default Tooltip