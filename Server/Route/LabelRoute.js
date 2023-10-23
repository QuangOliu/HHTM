var express = require('express')
const {
  createLabel,
  readLabels,
  updateLabel,
  deleteLabel,
  searchLabel,
  getLabel,
} = require('../Controller/LabelsController')
var router = express.Router()

/////////// ROUTE Label
//Create Label
router.post('/create', createLabel)

//Read Label
router.get('/get', readLabels)

//Search label
router.get('/search', searchLabel)

//Update Label
router.put('/update/:label_id', updateLabel)

//Delete Label
router.delete('/delete/:label_id', deleteLabel)

router.get('/:label_id', getLabel)

module.exports = router
