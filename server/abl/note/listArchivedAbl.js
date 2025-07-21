const noteDao = require('../../dao/note-dao.js')

async function ListArchivedAbl(req, res) {
  try {
    const notes = noteDao.listArchived()
    res.json({ noteList: notes })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = ListArchivedAbl