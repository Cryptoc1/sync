import EventEmitter from 'events'
import readline from 'readline'
import { clearInterval } from 'timers'

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

class Program extends EventEmitter {
  static main (...args) {
    const instance = this.instance
    instance._bindEvents()
    return instance.main.apply(this.instance, args)
  }

  async _bindEvents () {
    process.stdin.on('keypress', (text, key) => {
      if (key.name === 'c' && key.ctrl) {
        if (this.__sigint !== undefined) clearInterval(this.__sigint)
        this.__sigint = setTimeout(() => console.warn('[Program] Intercepted repeated SIGINT triggers. Did you register to a binding to exit your Program?'), 800)
      }

      this.emit('keypress', text, key)
    })

    await this.bindEvents()
  }

  bindEvents () { }

  static get instance () {
    if (!this._instance) {
      this._instance = new this()
    }

    return this._instance
  }
}

export default Program
