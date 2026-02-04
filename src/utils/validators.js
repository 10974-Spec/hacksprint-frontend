export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const isValidURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validatePassword = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters'
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter'
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter'
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number'
  }
  return null
}

export const validateTeamName = (name) => {
  if (name.length < 3) {
    return 'Team name must be at least 3 characters'
  }
  if (name.length > 50) {
    return 'Team name must be less than 50 characters'
  }
  if (!/^[a-zA-Z0-9\s\-_]+$/.test(name)) {
    return 'Team name can only contain letters, numbers, spaces, hyphens, and underscores'
  }
  return null
}