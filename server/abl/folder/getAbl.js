const Ajv = require('ajv')
const ajv = new Ajv()
const folderDao = require('../../dao/folder-dao.js')

const schema = {
  type: 'object',
  properties: {
    id: { type: 'string' }
  },
  required: ['id'],
  additionalProperties: false
}

async function GetAbl(req, res) {
  try {
    const valid = ajv.validate(schema, req.query)
    if (!valid) {
      res.status(400).json({
        code: 'invalidDtoIn',
        message: 'DTO in is not valid',
        validationError: ajv.errors
      })
      return
    }

    const folder = folderDao.get(req.query.id)
    if (!folder) {
      res.status(404).json({
        code: 'folderNotFound',
        message: `Folder ${req.query.id} not found`
      })
      return
    }

    res.json(folder)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = GetAbl