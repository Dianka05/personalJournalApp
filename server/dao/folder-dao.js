const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const folderFolderPath = path.join(__dirname, 'storage', 'folderList')

if (!fs.existsSync(folderFolderPath)) {
    fs.mkdirSync(folderFolderPath, { recursive: true })
}

function get(folderId) {
    try {
        const filePath = path.join(folderFolderPath, `${folderId}.json`)
        const fileData = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(fileData)
    } catch (error) {
        if (error.code === 'ENOENT') return null
        throw { code: 'failedToReadFolder', message: error.message }
    }
}

function create(folder) {
    try {
        const folderList = list()
        if (folderList.some((item) => item.name === folder.name)) {
            throw { 
                code: 'folderNameNotUnique',
                message: 'Folder with this name already exists' ,
            }
        }
        folder.id = crypto.randomBytes(16).toString('hex')
        const fileName = path.join(folderFolderPath, `${folder.id}.json`)
        const fileData = JSON.stringify(folder)
        fs.writeFileSync(fileName, fileData, 'utf8')
        
        return folder
    } catch (error) {
        throw { code: 'failedToCreateFolder', message: error.message }
    }
}

function update(folder) {
    try {
        const currentFolder = get(folder.id)
        if (!currentFolder) {
            throw { code: 'invalidDtoIn', message: 'Folder not found' }
        }

        if (folder.name && folder.name !== currentFolder.name) {
            const folderList = list()
            if (folderList.some((item) => item.name === folder.name)) {
                throw {
                    code: 'folderNameNotUnique',
                    message: 'Folder with this name already exists'
                }
            }
        }

        const newFolder = { ...currentFolder, ...folder }
        const fileName = path.join(folderFolderPath, `${folder.id}.json`)
        const fileData = JSON.stringify(newFolder)
        fs.writeFileSync(fileName, fileData, 'utf8')
        
        return newFolder
    } catch (error) {
        throw { code: 'invalidDtoIn', message: error.message }
    }
}

function update(folder) {
    try {
      const currentFolder = get(folder.id);
      if (!currentFolder) {
        throw { code: "folderNotFound", message: "Složka neexistuje" };
      }
  
      if (folder.name && folder.name !== currentFolder.name) {
        const folderList = list();
        if (folderList.some((item) => item.name === folder.name)) {
          throw {
            code: "folderNameNotUnique",
            message: "Složka s tímto názvem již existuje"
          };
        }
      }
  
      const updatedFolder = { ...currentFolder, ...folder };
      
      const fileName = path.join(folderFolderPath, `${currentFolder.id}.json`);
      fs.writeFileSync(fileName, JSON.stringify(updatedFolder, null, 2), 'utf8');
      
      return updatedFolder;
    } catch (error) {
      throw { 
        code: error.code || "updateFailed", 
        message: error.message 
      };
    }
  }

function list() {
    try {
        if (!fs.existsSync(folderFolderPath)) {
            return []
        }

        const files = fs.readdirSync(folderFolderPath)
        const folderList = files.map((file) => {
            const fileDate = fs.readFileSync(
                path.join(folderFolderPath, file),
                'utf-8'
            )
            return JSON.parse(fileDate)
        })

        return folderList
    } catch (error) {
        throw { code: 'failedToListFolders', message: error.message }
    }
}

module.exports = {
    get,
    create,
    update,
    list,
}