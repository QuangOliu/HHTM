const {
  createRole,
  getRole,
  updateRole,
  deleteRole,
  searchRole,
} = require('../Controller/RoleController')
const { Op } = require('sequelize')

var express = require('express')
const { Model } = require('../Model')
var router = express.Router()

router.post('/create', createRole)

router.get('/get', getRole)

router.put('/update/:role_id', updateRole)

router.delete('/delete/:role_id', deleteRole)

router.get('/search', searchRole)

module.exports = router
