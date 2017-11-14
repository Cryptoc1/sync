import path from 'path'
import { FileUtility } from './utilities'
import Program from './program'

const WORKING_DIR = process.cwd()

class Sync extends Program {
  constructor () {
    super()
    this.writtenFiles = []
    this.files = []
  }

  async main (args) {
    const leftPath = this.convertToAbsolutePath(args.left)
    const rightPath = this.convertToAbsolutePath(args.right)

    let leftFiles = await FileUtility.list(leftPath)
    let rightFiles = await FileUtility.list(rightPath)

    let left = leftFiles.map(file => path.parse(path.join(leftPath, file)))
    let right = rightFiles.map(file => path.parse(path.join(rightPath, file)))

    console.log(`Comparing left (${left.length} file${left.length > 1 ? 's' : ''}) and right (${right.length} file${right.length > 1 ? 's' : ''})`)

    this.files = this.compareFiles(left, right, true)

    console.log(`Begin merge of ${this.files.length} files${this.files.length > 1 ? 's' : ''}`)

    for (let file of this.files) {
      let from = path.join(file.dir, file.base)
      let to = null

      if (file.dir.startsWith(leftPath)) {
        to = path.join(this.convertToAbsolutePath(rightPath, file.base))
      } else if (file.dir.startsWith(rightPath)) {
        to = path.join(this.convertToAbsolutePath(leftPath, file.base))
      }

      if (to !== null) {
        await this.moveFile(from, to)
      }
    }

    process.exit()
  }

  bindEvents () {
    this.on('keypress', (...args) => this.onKeypress(...args))
  }

  compareFiles (left, right, symmetric = false) {
    if (symmetric) return this.compareFiles(left, right).concat(this.compareFiles(right, left))

    let set = new Set(right.map(file => file.base))
    return left.filter(file => !set.has(file.base))
  }

  convertToAbsolutePath (root, file = '') {
    let isAbsolute = path.isAbsolute(root)

    if (isAbsolute) {
      return path.join(root, file)
    } else {
      return path.join(WORKING_DIR, root, file)
    }
  }

  logProgress () {
    console.log(`Written ${this.writtenFiles.length}/${this.files.length} file${this.files.length > 1 ? 's' : ''}`)
  }

  async moveFile (from, to) {
    console.log(`Sending ${from} -> ${to}`)
    await FileUtility.copy(from, to)
    this.writtenFiles.push({ from, to })
  }

  onKeypress (str, key) {
    if (key.name === 'c' && key.ctrl) return process.exit(-1)

    if (key.name === 'p') this.logProgress()
  }
}

export default Sync
