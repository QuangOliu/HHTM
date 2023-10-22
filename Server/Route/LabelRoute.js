var express = require('express')
const {
  createLabel,
  readLabels,
  updateLabel,
  deleteLabel,
  searchLabel,
} = require('../Controller/LabelsController')
var router = express.Router()

/////////// ROUTE Label
//Create Label
router.post('/create', createLabel)

//Read Label
router.get('/get', readLabels)

//Update Label
router.put('/update/:Label_id', updateLabel)

//Delete Label
router.delete('/delete/:Label_id', deleteLabel)

//Search label
router.get('/search', searchLabel)

module.exports = router
