import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return state.concat(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const objectToChange = state.find(a => a.id === id)
      const changedObject = { 
        ...objectToChange, 
        votes: objectToChange.votes + 1 
      }
      
      return state.map(a =>
        a.id !== id ? a : changedObject 
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const addVote = (id) => async dispatch => {
    const votedAnecdote = await anecdoteService.update(id)
    dispatch(voteAnecdote(votedAnecdote.id))
}

export const addAnecdote = (content) => async dispatch => {
  const newAnecdote = await anecdoteService.createNew(content)
  dispatch(createAnecdote(newAnecdote))
}
export const initializeAnecdotes = () => async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
}

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export default anecdoteSlice.reducer