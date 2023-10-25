import axiosClient from './axiosClient'

const trainingApi = {
  create(data) {
    const url = 'training/create'
    return axiosClient.post(url, data)
  },
  getItem(id) {
    const url = `training/model/${id}`
    return axiosClient.get(url)
  },
}

export default trainingApi
