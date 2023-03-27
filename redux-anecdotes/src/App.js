import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList '
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeanecdotes } from './reducers/anecdoteReducer'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(initializeanecdotes())
    }, [dispatch])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <VisibilityFilter />
      <AnecdoteList />
    </div>
  )
}

export default App