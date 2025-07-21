const noteDao = require('../../dao/note-dao.js')

async function GetAbl(req, res) {
  try {
    const { id } = req.query
    if (!id) {
      res.status(400).json({
        code: 'invalidDtoIn',
        message: 'Missing note id',
      })
      return
    }
    const note = noteDao.get(id)
    if (!note) {
      res.status(404).json({
        code: 'noteDoesNotExist',
        message: `Note with id ${id} does not exist`,
      })
      return
    }
    res.json(note)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = GetAbl
