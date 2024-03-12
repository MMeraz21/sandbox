import axios from "axios";
const baseUrl = 'http://localhost:3003/api/users'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)  //creates new which is why we use axios.post not put
    return response.data
  }

  const update = async objectToUpdate => {
    // const config = {
    //   headers: { Authorization: token }
    // }
    console.log(objectToUpdate)
    const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate)
    return response.data
  }

  export default {getAll, create, update}