import React from 'react'
import './ProgressBar.css'

const ProgressBar = ({percentage}) => {
  console.log(percentage)
  return (
    <div className='progress-bar'>
        <div 
        style={
          {
            width: `${percentage}%`,
            height: 'inherit',
            background: '#b22222',
          }
        }
        ></div>
    </div>
  )
}

export default ProgressBar