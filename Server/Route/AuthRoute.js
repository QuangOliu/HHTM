var express = require('express')
var router = express.Router()

const { loginController, registerController } = require('../Controller/AuthController')

/////////// ROUTE AUTH
// Route đăng ký người dùng mới
router.post('/register', registerController)

// Route đăng nhập
router.post('/login', loginController)

module.exports = router
