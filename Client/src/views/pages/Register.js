import React, { useState } from 'react'
import authApi from '../../api/authApi'

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const Forms = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    authApi
      .register(formData)
      .then((result) => {
        if (result?.status >= 200 && result.status < 300) {
          console.log(result)

          navigate('/login')
        }
      })
      .catch((err) => {}) // Gửi thông tin đăng nhập đến action
  }

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Login Page
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Username"
                  type="text" // Thay type thành 'text'
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </FormGroup>{' '}
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input
                  id="Email"
                  name="email"
                  placeholder="Email"
                  type="text" // Thay type thành 'text'
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <Button className="mt-2" type="submit">
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Forms
