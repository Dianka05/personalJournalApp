const Ajv = require('ajv')
const ajv = new Ajv()

const folderDao = require('../../dao/folder-dao.js')

const schema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
    },
    required: ['name'],
    additionalProperties: false,
}

async function createAbl(req, res) {
    try {
        let folder = req.body

        const valid = ajv.validate(schema, folder)
        if (!valid) {
            res.status(400).json({
                code: 'invalidDtoIn',
                message: 'dtoIn is not valid',
                validationErrors: ajv.errors
            })
            return
        }

        try {
            folder = folderDao.create(folder)
        } catch (error) {
            res.status(400).json({ 
                code: error.code,
                message: error.message
            })
            return
        }
        res.json(folder)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = createAbl