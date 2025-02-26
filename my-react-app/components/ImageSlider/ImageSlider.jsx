import React, { useState } from 'react'
import { GrPrevious } from "react-icons/gr";

const ImageSlider = ({imageUrls}) => {
    const [imageIndex, setImageIndex] = useState(0);
    console.log(imageUrls)

  return (
    <div>
        <img src={imageUrls[imageIndex]} />
        <button>
            <GrPrevious />
        </button>
    </div>
  )
}

export default ImageSlider