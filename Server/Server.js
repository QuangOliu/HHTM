const express = require('express')

const app = express()
const bodyParser = require('body-parser')

const authRoute = require('./Route/AuthRoute')
const imageRoute = require('./Route/ImageRoute')
const labelRoute = require('./Route/LabelRoute')
const roleRoute = require('./Route/RoleRoute')

app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

const db = require('./connectDB')

/////////// ROUTE AUTH
// Route đăng ký người dùng mới
app.use('/auth', authRoute)

app.use('/images', imageRoute)

app.use('/labels', labelRoute)

app.use('/roles', roleRoute)

app.get('/', (req, res) => {
  const query = 'SELECT * FROM users'

  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(200).json({
      status: 200,
      data: results,
      message: 'Lấy danh sách người dùng thành công.',
    })
  })
})

// Khởi động máy chủ
app.listen(4000, () => {
  console.log('Server is running on port 4000')
})
