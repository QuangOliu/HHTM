var express = require('express')
var router = express.Router()
const multer = require('multer')
const fs = require('fs')
const dir = 'uploads'

const {
  createModel,
  getAllModels,
  getModelByID,
  updateModel,
  deleteModel,
  searchModel,
} = require('../Controller/ModelController')

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'model-ai/') // Thư mục lưu trữ tệp
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname) // Tên tệp trên máy chủ
  },
})
const upload = multer({ storage: storage })

// Route để tạo một model mới (Create)
router.post('/create', upload.single('file'), createModel)

// Route để lấy tất cả các models (Read)
router.get('/get', getAllModels)

// Route để cập nhật thông tin một model theo ID (Update)
router.put('/update/:modelId', updateModel)

// Route để xóa một model theo ID (Delete)
router.delete('/delete/:modelId', deleteModel)

// Route để tìm kiếm model theo tên (model_name)
router.get('/search', searchModel)

// Route để lấy thông tin một model theo ID (Read)
router.get('/:modelId', getModelByID)

module.exports = router
