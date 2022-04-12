import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
  // console.log(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
  // console.log(`modifying ${id} with `, newObject)
}

export default {getAll, create, deletePerson, update}