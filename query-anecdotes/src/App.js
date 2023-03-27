import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient  } from 'react-query' 
import { getAnecdotes, updateAnecdote } from './request'
import { useNotificationDispatch } from './NotificationContext'



const App = () => {
  const queryClient =  useQueryClient() 
  const dispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: false
    })

  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }
  if ( result.error ) {    
    return <div>Anecdote service is not available due to problems in server😔</div>  
  }
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    dispatch({type: "CREATE", payload: `you voted "${anecdote.content}" `})
    setTimeout(()=> {
      dispatch({type: "CLEAR"})
    }, 5*1000)

  }




  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
