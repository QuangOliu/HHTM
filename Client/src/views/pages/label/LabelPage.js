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
import labelApi from '../../../api/labelApi'
import { useNavigate } from 'react-router-dom'

const Tables = () => {
  const [tableData, setTableData] = useState([])
  const [searchTerm, setSetsearchTerm] = useState('')

  const navigator = useNavigate()
  useEffect(() => {
    labelApi
      .getAll()
      .then((result) => {
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
    labelApi
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
    navigator(`/label/edit/${id}`)
  }

  const handelDelete = (id) => {
    labelApi
      .delete(id)
      .then((result) => {
        console.log(result)
        setTableData((pre) => {
          const newData = pre.filter((item) => item.label_id !== id)
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
            Danh sách Label
          </CardTitle>
          <CardBody className="">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="search">Search</Label>
                <Input
                  id="search"
                  name="search"
                  placeholder="Search Label"
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
                  <th>Label Name</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item?.label_id}</th>
                      <th scope="row">{item?.label_name}</th>
                      <th>
                        <Button
                          className="btn mx-4"
                          outline
                          color="warning"
                          onClick={() => handleEdit(item?.label_id)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="btn"
                          color="danger"
                          onClick={() => handelDelete(item?.label_id)}
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
              onClick={() => navigator('/label/add')}
            >
              ADD Label
            </Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Tables
