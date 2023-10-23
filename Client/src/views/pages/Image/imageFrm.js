// Trong trang "LabelPage"
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import labelApi from '../../../api/labelApi'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

const LabelPage = () => {
  const navigation = useNavigate()
  const [isNull, setIsNull] = useState(false)
  const [formData, setFormData] = useState({
    label_id: '',
    label_name: '',
  })

  const { slug } = useParams()
  const [isAdd, setIsAdd] = useState(false)

  useEffect(() => {
    if (slug) {
      setIsAdd(false)
    } else setIsAdd(true)
  }, [slug])

  useEffect(() => {
    labelApi
      .getLabel(slug)
      .then((result) => {
        if (result?.status >= 200 && result?.status < 300) {
          console.log(result.data)
          setFormData(result.data)
        }
        if (result?.status >= 400 && result.status < 500) {
          setIsNull(true)
        }
      })
      .catch((err) => {})
  }, [slug])

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
      labelApi
        .create(formData)
        .then((result) => {
          console.log(result)
          navigation('/label')
        })
        .catch((err) => {})
    } else {
      labelApi
        .update(formData.label_id, formData)
        .then((result) => {
          console.log(result)
          navigation('/label')
        })
        .catch((err) => {})
    }
  }

  return (
    <div>
      <h1>Label Page</h1>
      <p>Slug: {slug}</p>
      {true ? (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="label">Label name</Label>
            <Input
              id="label"
              name="label_name"
              placeholder="Label name"
              type="text" // Thay type thành 'text'
              value={formData.label_name}
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
