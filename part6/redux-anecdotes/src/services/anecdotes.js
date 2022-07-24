import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (content) => {
  const object = { 
  content: content,
  votes: 0 
}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id) => {
  const anecdote = await getOne(id)
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
    return response.data
}



// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll, 
  getOne,
  createNew,
  update
}