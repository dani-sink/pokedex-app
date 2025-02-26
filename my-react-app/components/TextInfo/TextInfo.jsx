import React from 'react'
import './TextInfo.css'

const TextInfo = ({title, children, width, height, color}) => {
  return (
    <div
        className='pokemon-title-and-content-container'
        style={
            {
                width: width,
                height: height,
            }
        }
    >
        <div className='title-container'>
                {title}
        </div>
        <div 
            className='pokemon-text-info-container'
            style={{
                backgroundColor: color
            }}
        >
            <div className='content-container'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default TextInfo