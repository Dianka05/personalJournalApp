const folderDao = require('../../dao/folder-dao.js')

async function ListAbl(req, res) {
  try {
    const folders = folderDao.list(req.query.filter)
    res.json({ folderList: folders })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = ListAbl