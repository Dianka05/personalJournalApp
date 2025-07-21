const Ajv = require('ajv')
const ajv = new Ajv()

const folderDao = require('../../dao/folder-dao.js')
const noteDao = require('../../dao/note-dao.js')

const schema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        date: { type: 'string' },
        folderId: { type: 'string' },
        archived: { type: 'boolean' },
    },
    required: ['title', 'content'],
    additionalProperties: false,
}

async function createAbl(req, res) {
    try {
        let note = req.body

        const valid = ajv.validate(schema, note)
        if (!valid) {
            res.status(400).json({
                code: 'invalidDtoIn',
                message: 'dtoIn is not valid',
                validationErrors: ajv.errors
            })
            return
        }

        if (note.folderId) {
            const folder = folderDao.get(note.folderId)
            if (!folder) {
                res.status(400).json({
                    code: 'folderDoesNotExist',
                    message: `Folder with id ${note.folderId} does not exist`,
                })
                return
            }
        }
        note.date = note.date || new Date().toISOString()
        note.archived = false

        try {
            note = noteDao.create(note)
        } catch (error) {
            res.status(400).json({message: error.message})
            return
        }

        res.json(note)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = createAbl