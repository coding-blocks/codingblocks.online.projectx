import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';
import { computed } from '@ember/object';

export default class PlayerTabs extends Component {
  @service player
  @service store


  DoubtsTab = {
    name: 'Doubts',
    component: 'player/player-doubts-tab',
    task: this.fetchDoubtsTask
  }

  NotesTab = {
    name: 'Notes',
    component: 'player/player-notes-tab',
    task: this.fetchNotesTask
  }

  @computed('runAttempt.runTier')
  get tabs() {
    const {DoubtsTab, NotesTab} = this
    return this.runAttempt.runTier === 'LITE' ? [NotesTab] : [DoubtsTab, NotesTab]
  }
  
  activeTab = this.tabs.firstObject
  contentListCollpased = true

  @computed('player.runAttemptId', 'store')
  get runAttempt() {
    return this.store.peekRecord('run-attempt', this.player.runAttemptId)
  }
  
  @restartableTask fetchDoubtsTask = function *() {
    return this.store.query('doubt', {
      filter: {
        runAttemptId: this.player.runAttemptId,
        contentId: this.player.contentId
      }
    })
  }

  @restartableTask fetchNotesTask = function *() {
    return this.store.query('note', {
      filter: {
        runAttemptId: this.player.runAttemptId,
        contentId: this.player.contentId
      }
    })
  }

  @action 
  openAskDoubtModal() {
    const content = this.store.peekRecord('content', this.player.contentId)
    const runAttempt = this.store.peekRecord('run-attempt', this.player.runAttemptId)
    const doubt = this.store.createRecord('doubt', {
      content,
      runAttempt
    })

    this.set('newDoubt', doubt)
    this.set('showAskDoubtModal', true)
  }

  @action
  closeAskDoubtModal() {
    this.newDoubt.rollbackAttributes()
    this.set('showAskDoubtModal', false)
  }
}
