const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ku@lg2kll',
  database: 'httm',
})

db.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err)
  } else {
    console.log('Kết nối cơ sở dữ liệu thành công')
  }
})
module.exports = db
