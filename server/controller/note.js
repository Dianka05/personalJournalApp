const express = require('express')
const router = express.Router()

const createAbl = require('../abl/note/createAbl')
const getAbl = require('../abl/note/getAbl')
const listAbl = require('../abl/note/listAbl')
const updateAbl = require('../abl/note/updateAbl')
const archiveAbl = require('../abl/note/archiveAbl')
const restoreAbl = require('../abl/note/restoreAbl')
const listByFolderId = require('../abl/note/listByFolderId')
const listArchivedAbl = require('../abl/note/listArchivedAbl')


router.post('/create', createAbl)
router.get('/get', getAbl)
router.get('/list', listAbl)
router.post('/update', updateAbl)
router.post('/archive', archiveAbl)
router.post('/restore', restoreAbl)
router.get('/listByFolderId', listByFolderId)
router.get('/listArchived', listArchivedAbl)

module.exports = router