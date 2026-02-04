export default function Progress({ value, max = 100, color = 'primary', showLabel = false, label = '' }) {
  const colors = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500',
    green: 'bg-gradient-to-r from-green-500 to-emerald-500',
    yellow: 'bg-gradient-to-r from-yellow-500 to-amber-500',
    red: 'bg-gradient-to-r from-red-500 to-pink-500',
    purple: 'bg-gradient-to-r from-purple-500 to-pink-500',
  }
  
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">{label}</span>
          <span className="text-gray-600 dark:text-gray-400">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-200 dark:bg-dark-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colors[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}