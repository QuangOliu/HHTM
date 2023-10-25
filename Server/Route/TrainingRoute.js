const express = require('express')
const router = express.Router()
const { Training, Image, Label } = require('../Model') // Import mô hình Training và Image
const { createTraining } = require('../Controller/TrainingController')
const sequelize = require('../sequelize')

// Route để tạo các bản ghi Training cho nhiều image_id (Create)
router.post('/create', createTraining)

router.get('/model/:model_id', async (req, res) => {
  try {
    const model_id = req.params.model_id

    if (!model_id) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Missing model_id parameter in the query.',
      })
    }

    // Thực hiện truy vấn SQL SELECT DISTINCT
    const query = `
      SELECT DISTINCT image_id
      FROM trainings
      WHERE model_id = :model_id
    `

    const distinctImages = await sequelize.query(query, {
      replacements: { model_id },
      type: sequelize.QueryTypes.SELECT,
    })

    // Trích xuất danh sách các image_id từ kết quả
    const imageIds = distinctImages.map((item) => item.image_id)

    res.status(200).json({
      status: 200,
      data: imageIds,
      message: `Unique Image IDs retrieved successfully for model_id = ${model_id}`,
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
