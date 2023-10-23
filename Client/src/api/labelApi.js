import axiosClient from './axiosClient'

const labelApi = {
  create(data) {
    const url = 'labels/create'
    return axiosClient.post(url, data)
  },
  getAll() {
    const url = 'labels/get'
    return axiosClient.get(url)
  },
  getLabel(id) {
    const url = `labels/${id}`
    return axiosClient.get(url)
  },
  update(id, data) {
    // update/:Label_id
    const url = `labels/update/${id}`
    return axiosClient.put(url, data)
  },
  delete(id) {
    const url = `labels/delete/${id}`
    return axiosClient.delete(url)
  },
  search(key) {
    const url = `labels/search?q=${key}`
    console.log(url)
    return axiosClient.get(url)
  },
}

export default labelApi
