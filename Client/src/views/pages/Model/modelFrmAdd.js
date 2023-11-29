import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import imageApi from '../../../api/imageApi'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import labelApi from '../../../api/labelApi'

const LabelPage = () => {
  const navigation = useNavigate()
  const [isNull, setIsNull] = useState(false)
  const [labels, setLabels] = useState([])

  const [file, setFile] = useState(null)

  const [formData, setFormData] = useState({
    user_id:'',
    model_name:'',
    description:'',
    architecture:'',
    training_duration:'',
    loss:'',
    accuracy:'',
  })

  const { slug } = useParams()
  const [isAdd, setIsAdd] = useState(false)

  useEffect(() => {
    if (slug) {
      setIsAdd(false)
    } else setIsAdd(true)
  }, [slug])

  useEffect(() => {
    imageApi
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (file) {
      const x = new FormData()
      x.append('file', file)
      x.append('description', formData.description)
      x.append('label_id', formData.label_id)

      fetch('http://localhost:4000/model/create', {
        method: 'POST',
        body: x,
      })
        .then((response) => response.json())
        .then((data) => {
          navigation("/image")
          console.log(data)
        })
        .catch((error) => {
          console.error('Error uploading file:', error)
        })
    }
  }

  return (
    <div>
      <h1>Image Page</h1>
      <p>Slug: {slug}</p>
      {true ? (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input
              id="exampleFile"
              name="file"
              type="file"
              onChange={handleFileChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Model Name</Label>
            <Input
              id="model_name"
              name="model_name"
              placeholder="Image model_name"
              type="text"
              value={formData.model_name}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Model Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Image description"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Model architecture</Label>
            <Input
              id="architecture"
              name="architecture"
              placeholder="Image architecture"
              type="text"
              value={formData.architecture}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="training_duration">Model training_duration</Label>
            <Input
              id="training_duration"
              name="training_duration"
              placeholder="Image training_duration"
              type="text"
              value={formData.training_duration}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="loss">Model loss</Label>
            <Input
              id="loss"
              name="loss"
              placeholder="Image loss"
              type="text"
              value={formData.loss}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="accuracy">Model accuracy</Label>
            <Input
              id="accuracy"
              name="accuracy"
              placeholder="Image accuracy"
              type="text"
              value={formData.accuracy}
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
