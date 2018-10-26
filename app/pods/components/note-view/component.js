import Component from '@ember/component'
import { action } from 'ember-decorators/object'
import { service } from 'ember-decorators/service'
import { task } from 'ember-concurrency'

export default class NoteViewComponent extends Component {
  @service api
  @service store
  isEditing = false
  deleted = false

  saveNoteTask = task(function * () {
    yield this.get('note').save()
    this.set("isEditing", false)
  }).drop()

  deleteNote = task(function * () {
    yield this.get('api').request('/notes/'+ this.get('note.id'), {
      method: 'DELETE',
    })
    this.get('note').deleteRecord()
    this.set('deleted', true)
  }).drop()

  @action
  toggleEdit () {
    this.toggleProperty('isEditing')
  }

  @action
  undo () {
    const noteId = this.get('note.id')
    this.get('api').request(`/notes/${noteId}/undo`).then(payload => {
      this.set("deleted", false)

      this.get('note').rollbackAttributes()
    })
  }

  
}
