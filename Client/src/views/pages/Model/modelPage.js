import { useEffect, useState } from 'react'
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
  Table,
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import modelApi from '../../../api/modelApi'

const Tables = () => {
  const [tableData, setTableData] = useState([])
  const [searchTerm, setSetsearchTerm] = useState('')

  const navigator = useNavigate()
  useEffect(() => {
    modelApi
      .getAll()
      .then((result) => {
        console.log(result)
        if (result.status >= 200 && result.status < 300) {
          setTableData(result?.data)
        }
      })
      .catch((err) => {})
  }, [])

  const handleInputChange = (e) => {
    const { value } = e.target
    setSetsearchTerm(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(searchTerm)
    modelApi
      .search(searchTerm)
      .then((result) => {
        console.log(result)

        if (result.status >= 200 && result.status < 300) {
          setTableData(result?.data)
        } else if (result.status >= 400 && result.status < 500) {
          setTableData([])
        }
      })
      .catch((err) => {})
  }

  const handleEdit = (id) => {
    navigator(`/model/edit/${id}`)
  }

  const handelDelete = (id) => {
    modelApi
      .delete(id)
      .then((result) => {
        console.log(result)
        setTableData((pre) => {
          const newData = pre.filter((item) => item.model_id !== id)
          return newData
        })
      })
      .catch((err) => {})
  }
  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Danh sách Model
          </CardTitle>
          <CardBody className="">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="search">Search</Label>
                <Input
                  id="search"
                  name="search"
                  placeholder="Search Model"
                  type="text" // Thay type thành 'text'
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <Button className="mb-3" type="submit">
                Search
              </Button>
            </Form>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Model Name</th>
                  <th>File path</th>
                  <th>Create by</th>
                  <th>Description</th>
                  <th>training duration</th>
                  <th>Architecture</th>
                  <th>Loss</th>
                  <th>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item?.model_id}</th>
                      <th scope="row">{item?.model_name}</th>
                      <th scope="row">{item?.path}</th>
                      <th scope="row">{item?.user_id}</th>
                      <th scope="row">{item?.description}</th>
                      <th scope="row">{item?.training_duration}</th>
                      <th scope="row">{item?.architecture}</th>
                      <th scope="row">{item?.loss}</th>
                      <th scope="row">{item?.accuracy}</th>
                      <th>
                        <Button
                          className="btn mx-4"
                          outline
                          color="warning"
                          onClick={() => handleEdit(item?.model_id)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="btn"
                          color="danger"
                          onClick={() => handelDelete(item?.model_id)}
                        >
                          Delete
                        </Button>
                      </th>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <Button
              className="btn"
              color="primary"
              onClick={() => navigator('/model/add')}
            >
              ADD Model
            </Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Tables
