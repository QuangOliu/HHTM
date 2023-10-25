import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import imageApi from '../../../api/imageApi'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import labelApi from '../../../api/labelApi'

const LabelPage = () => {
  const navigation = useNavigate()
  const [isNull, setIsNull] = useState(false)
  const [labels, setLabels] = useState([])

  const [formData, setFormData] = useState({
    image_id: '',
    name: '',
    file_path: '',
    upload_date: '',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Kiểm tra nếu label_id là "No Label" thì thiết lập thành null
    if (formData.label_id === 0) {
      formData.label_id = null
    }

    if (isAdd) {
      imageApi
        .create(formData)
        .then((result) => {
          navigation('/image')
        })
        .catch((err) => {})
    } else {
      imageApi
        .update(formData.image_id, formData)
        .then((result) => {
          navigation('/image')
        })
        .catch((err) => {})
    }
  }

  return (
    <div>
      <h1>Image Page</h1>
      <p>Slug: {slug}</p>
      {true ? (
        <Form onSubmit={handleSubmit}>
          <p>Image ID: {formData.image_id}</p>
          <p>File path: {formData.file_path}</p>
          <p>Upload: {formData.upload_date}</p>
          <FormGroup>
            <Label for="name">Image name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Image name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
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
