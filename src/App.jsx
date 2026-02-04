import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/slices/authSlice'
import { fetchCurrentPhase } from './store/slices/phaseSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(fetchCurrentPhase())
    
    const interval = setInterval(() => {
      dispatch(checkAuth())
    }, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App