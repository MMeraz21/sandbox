import axios from 'axios'
//const baseUrl = '/api/posts'
const baseUrl = 'http://localhost:3003/api/posts'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log(token)
}

const create = async newObject => {
  console.log(token)
  const config = {
    headers: { Authorization: token }
  }
  console.log(config)
  const response = await axios.post(baseUrl, newObject, config)  //creates new which is why we use axios.post not put
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async objectToUpdate => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate, config)
  return response.data
}

const remove = async id =>{
  const config = {
    headers: { Authorization: token }
  }
  //id = objectToRemove.id
  console.log(config)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, create, setToken, update, remove }