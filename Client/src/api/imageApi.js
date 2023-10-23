import axiosClient from './axiosClient'

const labelApi = {
  create(data) {
    const url = 'images/create'
    return axiosClient.post(url, data)
  },
  getAll() {
    const url = 'images/get'
    return axiosClient.get(url)
  },
  getLabel(id) {
    const url = `images/${id}`
    return axiosClient.get(url)
  },
  update(id, data) {
    // update/:Label_id
    const url = `images/update/${id}`
    return axiosClient.put(url, data)
  },
  delete(id) {
    const url = `images/delete/${id}`
    return axiosClient.delete(url)
  },
  search(key) {
    const url = `images/search?q=${key}`
    console.log(url)
    return axiosClient.get(url)
  },
}

export default labelApi
