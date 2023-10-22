var express = require('express')
var router = express.Router()
const multer = require('multer')
const fs = require('fs')
const dir = 'uploads'
const { Op } = require('sequelize')

const {
  createImage,
  readImages,
  updateImages,
  deleteImages,
  searchImage,
} = require('../Controller/ImagesController')

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Thư mục lưu trữ tệp
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname) // Tên tệp trên máy chủ
  },
})

const upload = multer({ storage: storage })

/////////// ROUTE IMAGE
//Create IMAGE
router.post('/create', upload.single('file'), createImage)

//Read IMAGE
router.get('/get', readImages)

//Update IMAGE
router.put('/update/:image_id', updateImages)

//Delete IMAGE
router.delete('/delete/:image_id', deleteImages)

router.get('/search', searchImage)

module.exports = router
