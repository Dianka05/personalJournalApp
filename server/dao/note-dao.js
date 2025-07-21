const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const noteFolderPath = path.join(__dirname, 'storage', 'noteList')

if (!fs.existsSync(noteFolderPath)) {
    fs.mkdirSync(noteFolderPath, { recursive: true })
}

function get(noteId) {
    try {
        const filePath = path.join(noteFolderPath, `${noteId}.json`)
        const fileData = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(fileData)
    } catch (error) {
        if (error.code === 'ENOENT') return null
        throw { code: 'failedToReadNote', message: error.message }
    }
}

function create(note) {
    try {
        note.id = crypto.randomBytes(16).toString('hex')
        const fileName = path.join(noteFolderPath, `${note.id}.json`)
        const fileData = JSON.stringify(note)
        fs.writeFileSync(fileName, fileData, 'utf8')
        
        return note
    } catch (error) {
        throw { code: 'failedToCreateNote', message: error.message }
    }
}

function update(note) {
    try {
      const currentNote = get(note.id);
      if (!currentNote) return null;
  
      const newNote = { ...currentNote, ...note };
      const filePath = path.join(noteFolderPath, `${note.id}.json`);
      fs.writeFileSync(filePath, JSON.stringify(newNote, null, 2));
      return newNote;
    } catch (error) {
      throw { code: "failedToUpdateNote", message: error.message };
    }
  }
  

function list(filter = {}) {
    try {
        if (!fs.existsSync(noteFolderPath)) {
            return []
        }

        const files = fs.readdirSync(noteFolderPath)
        let noteList = files.map((file) => {
            const fileDate = fs.readFileSync(
                path.join(noteFolderPath, file),
                'utf-8'
            )
            return JSON.parse(fileDate)
        })

        noteList = noteList.filter((note) => !note.archived)

        if (filter.folderId) {
            noteList = noteList.filter((note) => note.folderId === filter.folderId)
        }

        return noteList
    } catch (error) {
        throw { code: 'failedToListNotes', message: error.message }
    }
}

function listArchived() {
    try {
        if (!fs.existsSync(noteFolderPath)) {
            return []
        }

        const files = fs.readdirSync(noteFolderPath)
        const noteList = files.map((file) => {
            const fileDate = fs.readFileSync(
                path.join(noteFolderPath, file),
                'utf-8'
            )
            return JSON.parse(fileDate)
        }).filter((note) => note.archived)

        return noteList
    } catch (error) {
        throw { code: 'failedToListArchivedNotes', message: error.message }
        
    }
}

module.exports = {
    get,
    create,
    update,
    list,
    listArchived,
}