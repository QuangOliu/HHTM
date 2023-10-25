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
import imageApi from '../../../api/imageApi'
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
    imageApi
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
    navigator(`/image/edit/${id}`)
  }

  const handelDelete = (id) => {
    imageApi
      .delete(id)
      .then((result) => {
        console.log(result)
        setTableData((pre) => {
          const newData = pre.filter((item) => item.image_id !== id)
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
            Danh sách Image
          </CardTitle>
          <CardBody className="">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="search">Search</Label>
                <Input
                  id="search"
                  name="search"
                  placeholder="Search Image"
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
                  <th>File Name</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>label_id</th>
                  <th>Upload Date</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item?.image_id}</th>
                      <th scope="row">{item?.file_path}</th>
                      <th scope="row">{item?.name}</th>
                      <th scope="row">{item?.description}</th>
                      <th scope="row">{item?.label_id}</th>
                      <th scope="row">{item?.upload_date}</th>
                      <th>
                        <Button
                          className="btn mx-4"
                          outline
                          color="warning"
                          onClick={() => handleEdit(item?.image_id)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="btn"
                          color="danger"
                          onClick={() => handelDelete(item?.image_id)}
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
              onClick={() => navigator('/image/add')}
            >
              ADD Image
            </Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Tables
