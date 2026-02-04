import { useState } from 'react'

export default function Tabs({ tabs, defaultTab = 0, onChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  const handleTabClick = (index) => {
    setActiveTab(index)
    onChange?.(index)
  }
  
  return (
    <div>
      <div className="flex space-x-1 border-b border-gray-200/50 dark:border-dark-700/50">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-4 py-3 font-medium text-sm transition-colors relative ${
              activeTab === index
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500" />
            )}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  )
}