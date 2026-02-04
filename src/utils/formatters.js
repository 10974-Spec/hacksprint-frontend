import { format, formatDistanceToNow } from 'date-fns'

export const formatDate = (date, formatStr = 'PPpp') => {
  if (!date) return ''
  return format(new Date(date), formatStr)
}

export const formatRelativeTime = (date) => {
  if (!date) return ''
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const formatScore = (score) => {
  return score?.toFixed(1) || '0.0'
}

export const formatTeamSize = (current, max) => {
  return `${current}/${max}`
}

export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}