import fs from 'fs'
import copy from 'ncp'

copy.limit = 16

class FileUtility {
  static copy (from, to, options = {}) {
    return new Promise((resolve, reject) => {
      copy(from, to, options, err => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  static list (path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) return reject(err)
        return resolve(files)
      })
    })
  }

  static read (path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}

export default FileUtility
