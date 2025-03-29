import React from 'react'
import './ProgressBar.css'

const ProgressBar = ({percentage}) => {
  return (
    <div className='progress-bar'>
        <div className='progress-filled-bar'
        style={
          {
            width: `${percentage}%`,
            height: 'inherit',
            background: '#b22222',
            transition: "width 0.25s ease-in-out"
          }
        }
        ></div>
    </div>
  )
}

export default ProgressBar