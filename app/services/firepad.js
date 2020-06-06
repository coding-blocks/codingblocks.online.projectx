import Service from '@ember/service';
// import firepad from 'firepad'
import { getRef } from "codingblocks-online/utils/firebase";

export default class FirepadService extends Service {
  editor = null
  ref = null
  connected = false
  _firepad = null
  Firepad = null
  
  async loadFirepad() {
    if (this.Firepad)
      return;
    
    const firepad = await import('firepad')  
    this.set('Firepad', firepad)
  }

  async connect (refString = '', keepText = true) {
    if (refString.length) {
      this.set('ref', refString)
    }
    if (this.connected) {
      return ;
    }
    if (!this.editor) {
      throw new Error('You must set an Editor Instance first!')
    }
    if (!this.ref) {
      throw new Error('You must set a ref first!')
    }

    // firepad must be setup on an empty editor
    const defaultText = this.editor.getValue()
    this.editor.setValue("")
    
    const newFirepad = this.Firepad.fromMonaco(getRef(this.ref), this.editor, {
      defaultText
    })

    if (keepText) {
      await new Promise((resolve) => {
        const onEditorReady = () => {
          this.editor.setValue(defaultText)
          resolve()
        }
        newFirepad.on('ready', onEditorReady)
      })
    }
    
    this.set('connected', true)
    this.set('_firepad', newFirepad)
  }

  disconnect () {
    if (!this.connected) {
      return ;
    }

    this._firepad.dispose()
    this.set('connected', false)
  }

}
