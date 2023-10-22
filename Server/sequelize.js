const { Sequelize } = require('sequelize')

// Sử dụng dữ liệu kết nối MySQL đã có sẵn
const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',
  password: 'Ku@lg2kll',
  database: 'httm',
})

// Kiểm tra kết nối cơ sở dữ liệu
sequelize
  .authenticate()
  .then(() => {
    console.log('Kết nối cơ sở dữ liệu thành công.')
  })
  .catch((err) => {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err)
  })

module.exports = sequelize
