const { Training } = require('../Model') // Import mô hình Training

const createTraining = async (req, res) => {
  try {
    const { model_id, image_ids } = req.body

    if (!image_ids || !Array.isArray(image_ids)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Invalid image_ids. It should be an array.',
      })
    }

    // Tạo bản ghi Training cho mỗi image_id
    const createdTrainings = []
    for (const image_id of image_ids) {
      const training = await Training.create({ model_id, image_id })
      createdTrainings.push(training)
    }

    res.status(201).json({
      status: 201,
      data: createdTrainings,
      message: 'Trainings created successfully',
    })
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: error.message,
    })
  }
}

const modelTraining = async (req, res) => {}

module.exports = { createTraining, modelTraining }
