import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { action } from '@ember/object';
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

  @alias('run.topRunAttempt.progressPercent')
  progressPercent

  @action
  toggleBookmark() {
    if(this.content.get('bookmark.id')) {

      this.api.request(`/bookmarks/${this.content.get('bookmark.id')}`, {
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
}
