// components/ui/MinimalToast.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now()
    
    // Prevent duplicate toasts
    setToasts(prev => {
      // Check if same message already exists
      const existingToast = prev.find(toast => toast.message === message)
      if (existingToast) {
        return prev // Don't add duplicate
      }
      
      return [...prev, { id, message, type, duration }]
    })
    
    // Auto remove
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const success = (message, duration) => addToast(message, 'success', duration)
  const error = (message, duration) => addToast(message, 'error', duration)
  const info = (message, duration) => addToast(message, 'info', duration)
  const warning = (message, duration) => addToast(message, 'warning', duration)

  const value = {
    success,
    error,
    info,
    warning,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function Toast({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger slide-in animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="w-5 h-5" />
      case 'error':
        return <FaExclamationCircle className="w-5 h-5" />
      case 'warning':
        return <FaExclamationCircle className="w-5 h-5" />
      default:
        return <FaInfoCircle className="w-5 h-5" />
    }
  }

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      case 'warning':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div 
      className={`flex items-center border border-gray-300 bg-white shadow-lg w-96 transform transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      }`}
    >
      <div className={`flex items-center p-4 ${getIconColor()}`}>
        {getIcon()}
      </div>
      
      <div className="flex-1 p-4">
        <p className="text-base font-medium text-gray-900">{message}</p>
      </div>
      
      <button
        onClick={onClose}
        className="p-4 border-l border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <FaTimes className="w-4 h-4 text-gray-500 hover:text-gray-900" />
      </button>
    </div>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}