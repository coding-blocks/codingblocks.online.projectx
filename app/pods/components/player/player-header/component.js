import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { action } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';

export default class PlayerHeader extends Component {
  @service store
  @service player
  @service api

  @computed('player.contentId')
  get content() {
    if (this.player.contentId) {
      return this.store.peekRecord('content', this.player.contentId)
    }
  }

  @restartableTask toggleBookmark = function * () {
    if(this.content.get('bookmark.id')) {

      yield this.api.request(`/bookmarks/${this.content.get('bookmark.id')}`, {
        method: 'DELETE'
      })
      this.content.bookmark = undefined;
    } else {

      let bookmark = this.store.createRecord('bookmark', {
        runAttempt: this.store.peekRecord('run_attempt', this.player.runAttemptId),
        section: this.store.peekRecord('section', this.player.sectionId),
        content: this.content
      })
      bookmark.save()
    }
  }
  
  @computed('player.runAttemptId')
  get runAttempt() {
    if (this.player.runAttemptId) {
      return this.store.peekRecord('run-attempt', this.player.runAttemptId)
    }
  }

  @computed('runAttempt.progressPercent')
  get progressPercent() {
    if (this.runAttempt) {
      return this.runAttempt.progressPercent
    }
  }
}
