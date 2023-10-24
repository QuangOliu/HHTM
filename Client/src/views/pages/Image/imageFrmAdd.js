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
    description: '',
    label_id: null, // Khởi tạo label_id là null
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

      fetch('http://localhost:4000/images/create', {
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
            <Label for="description">Image Description</Label>
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
            <Label for="exampleSelect">Select</Label>
            <Input
              id="exampleSelect"
              name="label_id"
              type="select"
              value={formData.label_id || 0} // Đặt giá trị mặc định là 0 nếu label_id là null
              onChange={handleInputChange}
            >
              <option value={null}>No Label</option> {/* Lựa chọn "No Label" */}
              {labels.map((label) => (
                <option key={label.label_id} value={label.label_id}>
                  {label.label_name}
                </option>
              ))}
            </Input>
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
