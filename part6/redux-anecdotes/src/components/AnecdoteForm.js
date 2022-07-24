import { addAnecdote } from '../reducers/anecdoteReducer'
import { timedNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {

    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdote(content)
        props.timedNotification(`you added anecdote ${content}`, 5)

      }

    return (
        <div>
        <h2>create new</h2>
          <form onSubmit={add}>
            <div><input name="anecdote" /></div>
            <button type="submit"> create</button>
          </form>
        </div>
    )
}

export default connect(null, { addAnecdote, timedNotification })(AnecdoteForm) 
