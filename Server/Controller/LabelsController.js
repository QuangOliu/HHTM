const db = require('../connectDB')

const { Label } = require('../Model')
const createLabel = (req, res) => {
  const { label_name } = req.body

  const query = 'INSERT INTO Labels (label_name) VALUES (?)'
  db.query(query, [label_name], (err, result) => {
    if (err) {
      console.error('Lỗi thêm label:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(201).json({
      status: 201,
      data: { label_id: result.insertId },
      message: 'Label được tạo thành công.',
    })
  })
}

const readLabels = async (req, res) => {
  try {
    const labels = await Label.findAll() // Lấy tất cả các label từ cơ sở dữ liệu
    res.status(200).json({
      status: 200,
      data: labels,
      message: 'Danh sách label.',
    })
  } catch (error) {
    console.error('Lỗi truy vấn cơ sở dữ liệu:', error)
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Lỗi server.',
    })
  }
}
const updateLabel = (req, res) => {
  const label_id = req.params.label_id
  const { label_name } = req.body

  const query = 'UPDATE Labels SET label_name = ? WHERE label_id = ?'
  db.query(query, [label_name, label_id], (err, result) => {
    if (err) {
      console.error('Lỗi cập nhật label:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: 'Label được cập nhật thành công.',
    })
  })
}
const deleteLabel = (req, res) => {
  const label_id = req.params.label_id

  const query = 'DELETE FROM Labels WHERE label_id = ?'
  db.query(query, [label_id], (err, result) => {
    if (err) {
      console.error('Lỗi xóa label:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: 'Label được xóa thành công.',
    })
  })
}

module.exports = { createLabel, readLabels, updateLabel, deleteLabel }
