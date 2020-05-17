import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';


export default class UpgradeBlocker extends Component {
  @service store

  @dropTask fetchUpgradePacks = function* () {
    const { courseId, runAttempt } = this
    return this.store.query('upgrade-pack', {
      filter: {
        courseId,
        from: runAttempt.runTier
      }
    })
  }
}