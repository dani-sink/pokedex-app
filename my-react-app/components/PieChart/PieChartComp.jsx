import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

import './PieChart.css'

const PieChartComp = ({malePercentage, femalePercentage}) => {
  const data = [
    {id: 0, label: 'Male', value: malePercentage},
    {id: 1, label: 'Female', value: femalePercentage}
  ]
  return (
    <div className='pie-chart-container'>
        <PieChart
  series={[
    {
      data: [
        { id: 0, value: malePercentage, label: `Male - ${malePercentage}%`, color: '#3E92CC' },
        { id: 1, value: femalePercentage, label: `Female - ${femalePercentage}%`, color: '#FF6B6B' },
      ],
    },
  ]}
  width={350}
  height={100}
/>
    </div>
  )
}

export default PieChartComp