const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = 'your-secret-key' // Thay thế bằng mã bí mật thực tế

const db = require('../connectDB')

const loginController = (req, res) => {
  try {
    const { username, password } = req.body

    // Kiểm tra xem tên người dùng có tồn tại trong cơ sở dữ liệu
    const query = 'SELECT * FROM users WHERE username = ?'
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err)
        return res.status(500).json({
          status: 500,
          data: null,
          message: 'Lỗi server.',
        })
      }

      if (results.length === 0) {
        return res.status(401).json({
          status: 401,
          data: null,
          message: 'Tên người dùng không tồn tại.',
        })
      }

      const user = results[0]

      // So sánh mật khẩu với mật khẩu đã băm trong cơ sở dữ liệu
      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return res.status(401).json({
          status: 401,
          data: null,
          message: 'Mật khẩu không chính xác.',
        })
      }

      // Đăng nhập thành công: Tạo mã thông báo JWT
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: '1h',
      })

      res.status(200).json({
        status: 200,
        data: { token },
        message: 'Đăng nhập thành công.',
      })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Lỗi server.',
    })
  }
}

const registerController = (req, res) => {
  try {
    const { username, password, email } = req.body

    // Kiểm tra xem tên người dùng hoặc email đã tồn tại trong cơ sở dữ liệu chưa
    const query = 'SELECT * FROM users WHERE username = ? OR email = ?'
    db.query(query, [username, email], (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err)
        return res.status(500).json({
          status: 500,
          data: null,
          message: 'Lỗi server.',
        })
      }

      if (results.length > 0) {
        return res.status(400).json({
          status: 400,
          data: null,
          message: 'Tên người dùng hoặc email đã tồn tại.',
        })
      }

      // Băm mật khẩu trước khi lưu vào cơ sở dữ liệu
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Lỗi băm mật khẩu:', err)
          return res.status(500).json({
            status: 500,
            data: null,
            message: 'Lỗi server.',
          })
        }

        // Lưu người dùng vào cơ sở dữ liệu
        const insertQuery =
          'INSERT INTO users (username, password, email) VALUES (?, ?, ?)'
        db.query(insertQuery, [username, hashedPassword, email], (err) => {
          if (err) {
            console.error('Lỗi lưu người dùng vào cơ sở dữ liệu:', err)
            return res.status(500).json({
              status: 500,
              data: null,
              message: 'Lỗi server.',
            })
          }

          res.status(201).json({
            status: 201,
            data: null,
            message: 'Đăng ký thành công.',
          })
        })
      })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Lỗi server.',
    })
  }
}

module.exports = { loginController, registerController }
