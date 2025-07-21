const express = require('express')
const router = express.Router()

const createAbl = require('../abl/folder/createAbl')
const getAbl = require('../abl/folder/getAbl')
const listAbl = require('../abl/folder/listAbl')
const updateAbl = require('../abl/folder/updateAbl')


router.post('/create', createAbl)
router.get('/get', getAbl)
router.get('/list', listAbl)
router.post('/update', updateAbl)

module.exports = router