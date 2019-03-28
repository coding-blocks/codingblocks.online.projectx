import Service from '@ember/service';
import firepad from 'firepad'
import { getRef } from "codingblocks-online/utils/firebase";

export default class FirepadService extends Service {
  editor = null
  ref = null
  connected = false

  connect () {
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
    firepad.fromMonaco(getRef(this.ref), this.editor, {
      defaultText
    })

    this.connected = true
  }

  disconnect () {
    if (!this.connected) {
      return ;
    }
    this.ref = null
    firepad.dispose()
    this.connected = false
  }

}
