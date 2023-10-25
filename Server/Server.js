const express = require('express')
const bodyParser = require('body-parser')
const sharp = require('sharp')
const cors = require('cors')
const morgan = require('morgan')

const authRoute = require('./Route/AuthRoute')
const imageRoute = require('./Route/ImageRoute')
const labelRoute = require('./Route/LabelRoute')
const roleRoute = require('./Route/RoleRoute')
const modelRoute = require('./Route/ModelsRoute')
const trainingRoute = require('./Route/TrainingRoute')

const app = express()

app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(morgan('common'))

const db = require('./connectDB')
const fs = require('fs')
const path = require('path')

// Đường dẫn đến thư mục chứa các tệp public
const publicFolderPath = path.join(__dirname, 'uploads') // Thay đổi đường dẫn này
// Đường dẫn đến thư mục chứa các tệp cần hiển thị
const folderPath = './model-ai' // Thay đổi đường dẫn này
const picturePath = './uploads' // Thay đổi đường dẫn này
app.get('/files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi đọc thư mục',
      })
    } else {
      res.json({
        status: 200,
        data: files,
        message: 'Danh sách tệp',
      })
    }
  })
})

app.get('/pictures', (req, res) => {
  fs.readdir(picturePath, (err, files) => {
    if (err) {
      res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi đọc thư mục',
      })
    } else {
      res.json({
        status: 200,
        data: files,
        message: 'Danh sách tệp',
      })
    }
  })
})

// Middleware để phục vụ tệp tĩnh từ thư mục public
app.use('/public', express.static(publicFolderPath))

// Route public để hiển thị tệp cụ thể
app.get('/public/crop/:filename', (req, res) => {
  const { filename } = req.params
  const filePath = path.join(publicFolderPath, filename)

  // Kiểm tra xem tệp có tồn tại không
  if (!fs.existsSync(filePath)) {
    res.status(404).json({
      status: 404,
      data: null,
      message: 'Tệp không tồn tại',
    })
  } else {
    // Sử dụng sharp để xử lý ảnh và gửi về client
    sharp(filePath)
      .resize({ width: 50, height: 50 }) // Điều chỉnh kích thước theo ý muốn
      .toBuffer()
      .then((data) => {
        res.set('Content-Type', 'image/jpeg') // Điều chỉnh định dạng ảnh nếu cần
        res.send(data)
      })
      .catch((err) => {
        console.error('Error processing image:', err)
        res.status(500).json({
          status: 500,
          data: null,
          message: 'Lỗi xử lý ảnh',
        })
      })
  }
})

// Route public để hiển thị tệp cụ thể
app.get('/public/:filename', (req, res) => {
  const { filename } = req.params
  const filePath = path.join(publicFolderPath, filename)

  // Kiểm tra xem tệp có tồn tại không
  if (!fs.existsSync(filePath)) {
    res.status(404).json({
      status: 404,
      data: null,
      message: 'Tệp không tồn tại',
    })
  } else {
    // Phục vụ tệp cho người dùng
    res.sendFile(filePath)
  }
})

/////////// ROUTE AUTH
// Route đăng ký người dùng mới
app.use('/auth', authRoute)

app.use('/images', imageRoute)

app.use('/labels', labelRoute)

app.use('/roles', roleRoute)

app.use('/models', modelRoute)

app.use('/training', trainingRoute)

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
