const { Model } = require('../Model')
const db = require('../connectDB')

const createModel = async (req, res) => {
  const {
    user_id,
    model_name,
    description,
    architecture,
    training_duration,
    loss,
    accuracy,
  } = req.body
  const uploadedFile = req?.file 
  const path = uploadedFile?.filename

  const query = `
    INSERT INTO Models (user_id, model_name, path, description, architecture, training_duration, loss, accuracy)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

  const values = [
    user_id,
    model_name,
    path,
    description,
    architecture,
    training_duration,
    loss,
    accuracy,
  ]

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Lỗi tạo model:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(201).json({
      status: 201,
      data: { model_id: result.insertId },
      message: 'Model created successfully.',
    })
  })
}

const getAllModels = async (req, res) => {
  try {
    const models = await Model.findAll()
    res.json({
      status: 200,
      data: models,
      message: 'Models retrieved successfully',
    })
  } catch (error) {
    res.status(500).json({
      status: 400,
      data: null,
      message: error.message,
    })
  }
}
const getModelByID = async (req, res) => {
  const modelId = req.params.modelId
  try {
    const model = await Model.findByPk(modelId)
    if (model) {
      res.json({
        status: 200,
        data: model,
        message: 'Model retrieved successfully',
      })
    } else {
      res.json({
        status: 400,
        data: null,
        message: 'Model not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 400,
      data: null,
      message: error.message,
    })
  }
}

const updateModel = async (req, res) => {
  const modelId = req.params.modelId
  const { model_name, description } = req.body

  try {
    const model = await Model.findByPk(modelId)
    if (model) {
      model.model_name = model_name
      model.description = description

      await model.save()

      res.json({
        status: 200,
        data: model,
        message: 'Model updated successfully',
      })
    } else {
      res.json({
        status: 404,
        data: null,
        message: 'Model not found',
      })
    }
  } catch (error) {
    res.json({
      status: 400,
      data: null,
      message: error.message,
    })
  }
}

const deleteModel = async (req, res) => {
  const modelId = req.params.modelId
  try {
    const model = await Model.findByPk(modelId)
    if (model) {
      await model.destroy()
      res.json({
        status: 200,
        data: null,
        message: 'Model deleted successfully',
      })
    } else {
      res.json({
        status: 400,
        data: null,
        message: 'Model not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 400,
      data: null,
      message: error.message,
    })
  }
}

const searchModel = async (req, res) => {
  const { q } = req.query

  const query = 'SELECT * FROM Models WHERE model_name LIKE ?'

  db.query(query, [`%${q}%`], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn models:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(200).json({
      status: 200,
      data: results,
      message: 'Danh sách models tìm kiếm.',
    })
  })
}

module.exports = {
  createModel,
  getAllModels,
  getModelByID,
  updateModel,
  deleteModel,
  searchModel,
}
