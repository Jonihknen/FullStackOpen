/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import userService from './user'

const baseUrl = '/api/blogs'

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`
    }
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`, config())
}

export default { getAll, create, update, remove }
