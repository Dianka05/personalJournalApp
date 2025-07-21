const noteDao = require('../../dao/note-dao.js')
const folderDao = require('../../dao/folder-dao.js')

async function ListByFolderIdAbl(req, res) {
  try {
    const { folderId } = req.query
    if (!folderId) {
      res.status(400).json({
        code: 'invalidDtoIn',
        message: 'Missing folderId',
      })
      return
    }
    const folder = folderDao.get(folderId)
    if (!folder) {
      res.status(404).json({
        code: 'folderDoesNotExist',
        message: `Folder with id ${folderId} does not exist`,
      })
      return
    }
    const notes = noteDao.list({ folderId })
    res.json({ noteList: notes })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = ListByFolderIdAbl