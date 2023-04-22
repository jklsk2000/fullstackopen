import axios from 'axios'

const url = '/api/persons'

const getAll = () => {
    const req = axios.get(url)
    return req.then(res => res.data)
}

const create = newPerson => {
    const req = axios.post(url, newPerson)
    return req.then(res => res.data)
}

const update = (id, updatedPerson) => {
    const req = axios.put(`${url}/${id}`, updatedPerson)
    return req.then(res => res.data)
}

const deleteOne = id => {
    const req = axios.delete(`${url}/${id}`)
    return req.then(res => res.data)
}

export default { getAll, create, update, deleteOne }
