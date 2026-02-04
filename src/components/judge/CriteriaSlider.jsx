import { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function CriteriaSlider({ label, value, onChange, max = 25 }) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-medium">{label}</div>
        <div className="text-lg font-bold">{value}/{max}</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= 0}
          className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaMinus className="w-4 h-4" />
        </button>
        
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Poor</span>
            <span>Average</span>
            <span>Excellent</span>
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}