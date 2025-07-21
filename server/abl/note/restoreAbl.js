const Ajv = require('ajv')
const ajv = new Ajv()
const noteDao = require('../../dao/note-dao.js')

const schema = {
  type: 'object',
  properties: {
    id: { type: 'string' }
  },
  required: ['id'],
  additionalProperties: false
}

async function RestoreAbl(req, res) {
  try {
    const valid = ajv.validate(schema, req.body)
    if (!valid) {
      res.status(400).json({
        code: 'invalidDtoIn',
        message: 'DTO in is not valid',
        validationError: ajv.errors
      })
      return
    }

    const note = noteDao.get(req.body.id)
    if (!note) {
      res.status(404).json({
        code: 'noteNotFound',
        message: `Note ${req.body.id} not found`
      })
      return
    }

    if (!note.archived) {
      res.status(400).json({
        code: 'noteNotArchived',
        message: `Note ${req.body.id} is not archived`
      })
      return
    }

    const updatedNote = noteDao.update({ ...note, archived: false })
    res.json(updatedNote)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = RestoreAbl