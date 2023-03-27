import { useDispatch } from 'react-redux'
import  { addAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'


  const AnecdoteForm = () => {
    const dispatch = useDispatch()

const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(newNotification(`new anecdote '${content}'`, 10))

  }
    return (
        <form onSubmit={addAnec}>
            new anecdote: 
            <input name="anecdote" /> 
            <button type="submit">add</button>
        </form>
  )}
  export default AnecdoteForm