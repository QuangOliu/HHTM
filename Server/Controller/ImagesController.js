const db = require('../connectDB')

const createImage = (req, res) => {
  try {
    const { description, label_id } = req.body
    const uploadedFile = req.file // Thông tin tệp đã tải lên

    if (!uploadedFile) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Không có tệp được tải lên.',
      })
    }

    // Lưu đường dẫn của tệp vào cơ sở dữ liệu
    const file_path = uploadedFile.filename
    const name = file_path

    const insertQuery =
      'INSERT INTO Images (file_path, upload_date, description, label_id,name) VALUES (?, NOW(), ?, ?,?)'
    db.query(
      insertQuery,
      [file_path, description, label_id, name],
      (dbErr, dbResult) => {
        if (dbErr) {
          console.error('Lỗi thêm hình ảnh vào cơ sở dữ liệu:', dbErr)
          return res.status(500).json({
            status: 500,
            data: null,
            message: 'Lỗi server khi thêm vào cơ sở dữ liệu.',
          })
        }

        res.status(201).json({
          status: 201,
          data: { image_id: dbResult.insertId },
          message:
            'Hình ảnh được tải lên và thông tin được thêm vào cơ sở dữ liệu thành công.',
        })
      }
    )
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Lỗi server.',
    })
  }
}

const readImages = (req, res) => {
  const query = 'SELECT * FROM Images'
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
      message: 'Danh sách hình ảnh.',
    })
  })
}

const updateImages = (req, res) => {
  const image_id = req.params.image_id
  const { name, description, label_id } = req.body

  const query =
    'UPDATE Images SET name = ?, description = ?, label_id = ? WHERE image_id = ?'
  db.query(query, [name, description, label_id, image_id], (err, result) => {
    if (err) {
      console.error('Lỗi cập nhật hình ảnh:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: 'Hình ảnh được cập nhật thành công.',
    })
  })
}

const deleteImages = (req, res) => {
  const image_id = req.params.image_id

  const query = 'DELETE FROM Images WHERE image_id = ?'
  db.query(query, [image_id], (err, result) => {
    if (err) {
      console.error('Lỗi xóa hình ảnh:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: 'Hình ảnh được xóa thành công.',
    })
  })
}
const searchImage = async (req, res) => {
  try {
    const { q } = req.query

    const query = 'SELECT * FROM Images WHERE name LIKE ?'
    db.query(query, [`%${q}%`], (err, results) => {
      if (err) {
        console.error('Lỗi khi tìm kiếm Image:', err)
        return res.status(500).json({
          status: 500,
          data: null,
          message: 'Lỗi server.',
        })
      }

      res.status(200).json({
        status: 200,
        data: results,
        message: 'Kết quả tìm kiếm Image theo mô tả hoặc tên chứa từ khóa.',
      })
    })
  } catch (error) {
    console.error('Lỗi khi tìm kiếm Image:', error)
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Lỗi server.',
    })
  }
}

module.exports = {
  createImage,
  readImages,
  updateImages,
  deleteImages,
  searchImage,
}
