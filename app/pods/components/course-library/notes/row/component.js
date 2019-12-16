import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class NotesRowComponent extends Component {
  @service api

  isDeleted = false

  @alias('note.id') noteId

  @computed('isDeleted')
  get buttonText() {
    return this.isDeleted ? 'Undo' : 'Delete'
  }

  @action
  changeDeletedStatus() {
    this.isDeleted ? this.undoDelete() : this.deleteNote()
  }

  async undoDelete() {
    await  this.api.request(`/notes/${this.noteId}/undo`)
    this.set("isDeleted", false)
    this.note.rollbackAttributes()
  }

  async deleteNote() {
    await this.get('api').request('/notes/'+ this.noteId, {
      method: 'DELETE'
    })
    this.set("isDeleted", true)
  }
}
