import Component from '@ember/component'; 
import { inject as service } from '@ember/service';

export default class UpgradeModalComponent extends Component {
  @service metrics
  @service store

  didReceiveAttrs() {
    this._super(...arguments)
    const course = this.store.peekRecord('course', this.courseId)
    this.metrics.trackEvent({
      action: 'upgrade_packs_blocker_shown',
      label: this.intent || 'Unknown',
      category: course.identifier
    })
  }
}