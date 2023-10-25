import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import labelApi from '../../../api/labelApi'
import modelApi from '../../../api/modelApi'

const LabelPage = () => {
  const navigation = useNavigate()
  const [isNull, setIsNull] = useState(false)
  const [labels, setLabels] = useState([])

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

  const { slug } = useParams()
  const [isAdd, setIsAdd] = useState(false)

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
        if (result?.status >= 400 && result.status < 500) {
          setIsNull(true)
        }
      })
      .catch((err) => {})
  }, [slug])

  useEffect(() => {
    labelApi.getAll().then((result) => {
      if (result?.status >= 200 && result.status < 300) {
        setLabels(result.data)
      }
    })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isAdd) {
      modelApi
        .create(formData)
        .then((result) => {
          navigation('/model')
        })
        .catch((err) => {})
    } else {
      modelApi
        .update(slug, formData)
        .then((result) => {
          navigation('/model')
        })
        .catch((err) => {})
    }
  }

  return (
    <div>
      <h1>model Page</h1>
      <p>Slug: {slug}</p>
      {true ? (
        <Form onSubmit={handleSubmit}>
          <p>model ID: {formData?.model_id}</p>
          <p>Model name: {formData?.model_name}</p>
          <p>path: {formData?.path}</p>
          <p>Create By user id: {formData?.user_id}</p>
          <p>training duration: {formData?.training_duration}</p>
          <p>architecture: {formData?.architecture}</p>
          <p>Loss: {formData?.loss}</p>
          <p>accuracy: {formData?.accuracy}</p>
          <FormGroup>
            <Label for="model_name">model name</Label>
            <Input
              id="model_name"
              name="model_name"
              placeholder="model name"
              type="text"
              value={formData?.model_name}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">model Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="model description"
              type="text"
              value={formData?.description}
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button className="mt-2" type="submit">
            {!isAdd ? 'Update' : 'Add'}
          </Button>
        </Form>
      ) : (
        'Không tồn tại'
      )}
      {/* Hiển thị dữ liệu cho slug cụ thể tại đây */}
    </div>
  )
}

export default LabelPage
