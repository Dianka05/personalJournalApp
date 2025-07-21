const Ajv = require('ajv')
const ajv = new Ajv()
const noteDao = require('../../dao/note-dao.js')

const schema = {
  type: 'object',
  properties: {
    folderId: { type: 'string' }
  },
  additionalProperties: false
}

async function ListAbl(req, res) {
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
    const notes = noteDao.list(req.query)
    res.json({ noteList: notes })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = ListAbl