const express = require('express')
const router = express.Router()
const { Training, Image, Label } = require('../Model') // Import mô hình Training và Image
const { createTraining } = require('../Controller/TrainingController')

// Route để tạo các bản ghi Training cho nhiều image_id (Create)
router.post('/create', createTraining)

// Route để lấy tất cả image tương ứng cho model_id được chỉ định trong tham số truy vấn
router.get('/images/:model_id', async (req, res) => {
  try {
    const model_id = req.params.model_id

    if (!model_id) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Missing model_id parameter in the query.',
      })
    }

    // Thực hiện truy vấn JOIN giữa bảng Training và bảng Image
    const result = await Training.findAll({
      where: { model_id },
      include: [Image], // Liên kết với bảng Image
    })

    // Trích xuất danh sách các đối tượng Image từ kết quả
    const images = result.map((item) => item.Image)

    res.status(200).json({
      status: 200,
      data: images,
      message: `Images retrieved successfully for model_id = ${model_id}`,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: error.message,
    })
  }
})

// Route để lấy danh sách tất cả Training (Read all)
router.get('/list', async (req, res) => {
  try {
    const trainings = await Training.findAll()
    res.json({
      status: 200,
      data: trainings,
      message: 'List of all trainings',
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: error.message,
    })
  }
})
module.exports = router
