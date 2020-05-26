import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { computed } from '@ember/object';

export default class NotesTab extends Component {
  @service currentUser
  @service player
  @service store
  @service vdoservice
  @service youtubePlayer

  newNoteText = ''

  @computed('notes.[]')
  get sortedNotes() {
    return this.notes.sortBy('createdAt').reverse()
  }

  @restartableTask addNoteTask = function* ()  {
    const content = this.store.peekRecord('content', this.player.contentId)
    const section = this.store.peekRecord('section', this.player.sectionId)
    const runAttempt = this.store.peekRecord('run-attempt', this.player.runAttemptId)

    let duration ;
    switch (content.get('contentable')) {
      case 'lecture':  duration = this.get('vdoservice').currentTime; break;
      case 'video': duration = this.get('youtubePlayer').getCurrentTime(); break;
      default: duration = 0
    }

    const note = this.store.createRecord('note', {
      text: this.get('newNoteText'),
      content,
      section,
      duration
    })
    note.set('runAttempt', runAttempt)

    yield note.save()
    this.set('newNoteText', '')

    if (this.onAfterSave) {
      this.onAfterSave()
    }

    return note
  }
}
