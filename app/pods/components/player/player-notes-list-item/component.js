import Component from '@ember/component';
import { restartableTask, dropTask } from 'ember-concurrency-decorators';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class PlayerNotesListItem extends Component {
  @service api

  @computed('note.duration')
  get displayDuration() {
    const duration = moment.duration(this.note.duration, 'seconds')
    return `${duration.minutes()}:${duration.seconds()}`
  }

  @restartableTask saveNotesTask = function *() {
    yield this.note.save()
    this.set('isEditing', false)
  }

  @dropTask deleteNoteTask = function *() {
    yield this.api.request('/notes/'+ this.get('note.id'), {
      method: 'DELETE',
    })
    this.get('note').deleteRecord()
    this.set('isDeleted', true)
  }

  @action
  undo () {
    const noteId = this.get('note.id')
    this.api.request(`/notes/${noteId}/undo`).then(payload => {
      this.set("isDeleted", false)

      this.get('note').rollbackAttributes()
    })
  }
}
