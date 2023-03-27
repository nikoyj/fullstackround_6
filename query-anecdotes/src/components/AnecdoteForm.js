import { useMutation, useQueryClient  } from 'react-query'
import { createAnecdote } from '../request'
import { useNotificationDispatch } from '../NotificationContext'
const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({type: "CREATE", payload: "Too short anecdote, must have length 5 or more"})
      setTimeout(()=> {
        dispatch({type: "CLEAR"})
      }, 5*1000)
    }
  })
  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
    dispatch({type: "CREATE", payload: `New anecdote "${content}" `})
    setTimeout(()=> {
      dispatch({type: "CLEAR"})
    }, 5*1000)
}


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
