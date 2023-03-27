import { useDispatch, useSelector } from 'react-redux'
import  { update } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdote = useSelector(state => {
      if (state.filter === "") {
        return state.anec
      }
      return state.anec.filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const anecdotes = Array(...anecdote)
    const votet = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(update(anecdote))
        dispatch(newNotification(`you voted '${anecdote.content}'`, 10))
    }
    return(
        <div>
        {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => votet(anecdote)}>vote</button>
            </div>
          </div>
        )}
        </div>
    )
}

export default AnecdoteList