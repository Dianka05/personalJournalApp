const Ajv = require('ajv')
const ajv = new Ajv()

const noteDao = require('../../dao/note-dao.js')

const schema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
}

async function archiveAbl(req, res) {
    try {
        let dtoIn = req.body

        const valid = ajv.validate(schema, dtoIn)
        if (!valid) {
            res.status(400).json({
                code: 'invalidDtoIn',
                message: 'dtoIn is not valid',
                validationErrors: ajv.errors
            })
            return
        }

        const note = noteDao.get(dtoIn.id)
        if (!note) {
            res.status(400).json({
                code: 'noteDoesNotExist',
                message: `Note with id ${dtoIn.id} does not exist`,
            })
            return
        }

        if (note.archived) {
            res.status(400).json({
                code: 'noteAlreadyArchived',
                message: `Note with id ${dtoIn.id} is already archived`,
            })
            return
        }
        
        try {
            note.archived = true
            const updateNote = noteDao.update(note)
            res.json(updateNote)
        } catch (error) {
            res.status(400).json({message: error.message})
            return
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = archiveAbl