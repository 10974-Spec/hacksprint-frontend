export default function Card({ 
  children, 
  className = '', 
  hover = false, 
  padding = true, 
  ...props 
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm ${
        padding ? 'p-6' : ''
      } ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}