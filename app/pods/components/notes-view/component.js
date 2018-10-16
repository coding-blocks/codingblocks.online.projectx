import Component from '@ember/component'
import { service } from 'ember-decorators/service'
import { action } from 'ember-decorators/object'

export default class NotesViewComponent extends Component {
  @service store
  @service router
  @service currentContent
  @service lecturePlayer
  @service youtubePlayer

  @action
  addNote () {
    const contentId = this.get('currentContent').getContentId()
    const store = this.get('store')

    const content = store.peekRecord('content', contentId)
    let duration ;
    switch (content.get('contentable')) {
      case 'lecture':  duration = this.get('lecturePlayer').getCurrentTime(); break;
      case 'video': duration = this.get('youtubePlayer').getCurrentTime(); break;
      default: duration = 0
    }

    const note = store.createRecord('note', {
      text: this.get('newNoteText'),
      runAttempt: this.get('runAttempt'),
      content,
      duration
    })
    
    note.save().then(() => {
      this.set('newNoteText', '');
    })
  }
}
