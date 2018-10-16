import Component from '@ember/component'
import { action } from 'ember-decorators/object'
import { task } from 'ember-concurrency'

export default class NoteViewComponent extends Component {
  isEditing = false

  saveNoteTask = task(function * () {
    yield this.get('note').save()
    this.set("isEditing", false)
  }).drop()

  deleteNote = task(function * () {
    yield this.get('note').destroyRecord()
    this.destroy()
  }).drop()

  @action
  toggleEdit () {
    this.toggleProperty('isEditing')
  }

  
}
