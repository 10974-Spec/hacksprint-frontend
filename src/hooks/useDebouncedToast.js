// hooks/useDebouncedToast.js
import { useRef, useCallback } from 'react'
import { useToast as useBaseToast } from '../components/ui/MinimalToast'

export function useToast() {
  const baseToast = useBaseToast()
  const toastTimeout = useRef(null)

  const debouncedToast = useCallback((type, message, duration = 3000) => {
    // Clear any existing timeout
    if (toastTimeout.current) {
      clearTimeout(toastTimeout.current)
    }

    // Set new timeout
    toastTimeout.current = setTimeout(() => {
      baseToast[type](message, duration)
      toastTimeout.current = null
    }, 100) // Small delay to debounce
  }, [baseToast])

  return {
    success: (message, duration) => debouncedToast('success', message, duration),
    error: (message, duration) => debouncedToast('error', message, duration),
    info: (message, duration) => debouncedToast('info', message, duration),
    warning: (message, duration) => debouncedToast('warning', message, duration),
  }
}