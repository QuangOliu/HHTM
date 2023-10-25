import axiosClient from './axiosClient'

const modelApi = {
  create(data) {
    const url = 'models/create'
    return axiosClient.post(url, data)
  },
  getAll() {
    const url = 'models/get'
    return axiosClient.get(url)
  },
  getItem(id) {
    const url = `models/${id}`
    return axiosClient.get(url)
  },
  update(id, data) {
    // update/:Label_id
    const url = `models/update/${id}`
    return axiosClient.put(url, data)
  },
  delete(id) {
    const url = `models/delete/${id}`
    return axiosClient.delete(url)
  },
  search(key) {
    const url = `models/search?q=${key}`
    console.log(url)
    return axiosClient.get(url)
  },
}

export default modelApi
