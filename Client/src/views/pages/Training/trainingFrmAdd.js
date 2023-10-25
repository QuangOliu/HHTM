import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Table } from 'reactstrap'
import imageApi from '../../../api/imageApi'
import trainingApi from '../../../api/trainingApi'
import modelApi from '../../../api/modelApi'

const TrainingPage = () => {
  const navigation = useNavigate()
  const { slug } = useParams()
  const [isAdd, setIsAdd] = useState(false)
  const [formData, setFormData] = useState({
    model_name: '',
    model_id: '',
    path: '',
    user_id: '',
    description: '',
    training_duration: '',
    architecture: '',
    loss: '',
    accuracy: '',
  })
  const [pictures, setPictures] = useState([])
  const [picturesTraining, setPicturesTraining] = useState([])
  const [selectedImages, setSelectedImages] = useState([])

  useEffect(() => {
    if (slug) {
      setIsAdd(false)
    } else setIsAdd(true)
  }, [slug])

  useEffect(() => {
    modelApi
      .getItem(slug)
      .then((result) => {
        if (result?.status >= 200 && result?.status < 300) {
          setFormData(result.data)
        }
      })
      .catch((err) => {})
  }, [slug])

  useEffect(() => {
    imageApi
      .getAll()
      .then((result) => {
        if (result.status >= 200 && result.status < 300) {
          setPictures(result?.data)
        }
      })
      .catch((err) => {})
    trainingApi
      .getItem(slug)
      .then((result) => {
        setPicturesTraining(result.data)
      })
      .catch((err) => {})
  }, [slug])

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId))
    } else {
      setSelectedImages([...selectedImages, imageId])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Gửi danh sách selectedImages lên server hoặc xử lý theo nhu cầu của bạn.
    const requestData = {
      model_id: formData.model_id,
      image_ids: selectedImages,
    }
    trainingApi
      .create(requestData)
      .then((result) => {
        console.log(result)
        setPicturesTraining()
      })
      .catch((err) => {})
    console.log('Selected Images:', selectedImages)
  }

  const trainingImages = pictures.filter(
    (picture) => !picturesTraining.includes(picture.image_id)
  )

  return (
    <div>
      <h1>Training model Page</h1>
      <p>Slug: {slug}</p>
      {true ? (
        <Form onSubmit={handleSubmit}>
          <p>model ID: {formData?.model_id}</p>
          <p>Model name: {formData?.model_name}</p>
          <p>Model description: {formData?.description}</p>
          <p>path: {formData?.path}</p>
          <p>Create By user id: {formData?.user_id}</p>
          <p>training duration: {formData?.training_duration}</p>
          <p>architecture: {formData?.architecture}</p>
          <p>Loss: {formData?.loss}</p>
          <p>accuracy: {formData?.accuracy}</p>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Chọn</th>
                <th>#</th>
                <th>ảnh</th>
                <th>File Name</th>
                <th>Description</th>
                <th>label_id</th>
                <th>Upload Date</th>
              </tr>
            </thead>
            <tbody>
              {trainingImages.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(item.image_id)}
                        onChange={() => toggleImageSelection(item.image_id)}
                      />
                    </td>
                    <th scope="row">{item?.image_id}</th>
                    <td>
                      <img
                        src={`http://localhost:4000/public/crop/${item.file_path}`}
                        alt={item.name}
                      />
                    </td>
                    <td>{item.name}</td>
                    <th scope="row">{item?.description}</th>
                    <th scope="row">{item?.label_id}</th>
                    <th scope="row">{item?.upload_date}</th>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Button className="mt-2" type="submit">
            chọn ảnh
          </Button>
        </Form>
      ) : (
        'Không tồn tại'
      )}
      {/* Hiển thị dữ liệu cho slug cụ thể tại đây */}
    </div>
  )
}

export default TrainingPage
