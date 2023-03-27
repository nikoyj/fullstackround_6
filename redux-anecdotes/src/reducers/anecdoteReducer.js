import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdotes(state, action) {      
      state.push(action.payload)    
    },
    setAnecdotes(state, action) {      
      return action.payload    
    },
    vote(state, action) {
      return state.map(anec => 
        anec.id !== action.payload.id ? anec : action.payload)
    }
  },
})

export const { vote, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions

export const initializeanecdotes = () => {  
  return async dispatch => {    
    const anecdotes = await anecdoteService.getAll()    
    dispatch(setAnecdotes(anecdotes))  
  }}
export const addAnecdote = content => {  
    return async dispatch => {    
    const newNote = await anecdoteService.createNew(content)    
    dispatch(appendAnecdotes(newNote))  
  }}
 
export const update = content => {
  return async dispatch => {    
    const updated = await anecdoteService.updateAnec({
      ...content,
      votes: content.votes + 1
    })  
    dispatch(vote(updated))  
  }}   

  

export default anecdoteSlice.reducer