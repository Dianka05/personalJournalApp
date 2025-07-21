const Ajv = require('ajv')
const ajv = new Ajv()
const noteDao = require('../../dao/note-dao.js')
const folderDao = require('../../dao/folder-dao.js')

const schema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
    folderId: { type: 'string' },
  },
  required: ['id', 'title', 'content'],
  additionalProperties: false,
}

async function UpdateAbl(req, res) {
  try {
    const dtoIn = req.body
    const valid = ajv.validate(schema, dtoIn)
    if (!valid) {
      res.status(400).json({
        code: 'invalidDtoIn',
        message: 'dtoIn is not valid',
        validationError: ajv.errors,
      })
      return
    }

    const currentNote = noteDao.get(dtoIn.id)
    if (!currentNote) {
      res.status(404).json({
        code: 'noteDoesNotExist',
        message: `Note with id ${dtoIn.id} does not exist`,
      })
      return
    }

    if (dtoIn.folderId) {
      const folder = folderDao.get(dtoIn.folderId)
      if (!folder) {
        res.status(400).json({
          code: 'folderDoesNotExist',
          message: `Folder with id ${dtoIn.folderId} does not exist`,
        })
        return
      }
    }

    const updatedNote = noteDao.update({ ...currentNote, ...dtoIn })
    res.json(updatedNote)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = UpdateAbl
