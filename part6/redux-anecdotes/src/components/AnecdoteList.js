import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { timedNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  let anecdotes = useSelector(state => state.anecdotes)
  let filter = useSelector(state => state.filter)
  anecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes).filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(timedNotification(`you voted ${content}`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id} >
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )


}

export default AnecdoteList