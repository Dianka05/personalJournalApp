const Ajv = require('ajv')
const ajv = new Ajv()
const folderDao = require('../../dao/folder-dao.js')

const schema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['id', 'name'],
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

    const currentFolder = folderDao.get(dtoIn.id)
    if (!currentFolder) {
      res.status(404).json({
        code: 'folderDoesNotExist',
        message: `Folder with id ${dtoIn.id} does not exist`,
      })
      return
    }

    const folderList = folderDao.list()
    if (folderList.some(f => f.name === dtoIn.name && f.id !== dtoIn.id)) {
      res.status(400).json({
        code: 'folderNameNotUnique',
        message: 'Folder name already exists',
      })
      return
    }

    const updatedFolder = folderDao.update(dtoIn)
    res.json(updatedFolder)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = UpdateAbl