export default function Avatar({ src, alt, size = 'md', className = '', children }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover ${sizes[size]} ${className}`}
      />
    )
  }
  
  return (
    <div className={`rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium ${sizes[size]} ${className}`}>
      {children || (alt ? alt.charAt(0).toUpperCase() : '?')}
    </div>
  )
}