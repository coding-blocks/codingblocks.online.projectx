import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import config from 'codingblocks-online/config/environment';


export default class UpgradeBlocker extends Component {
  @service store
  @service currentUser

  @dropTask fetchUpgradePack = function* () {
    const { courseId, runAttempt } = this
    const upgradePacks = yield this.store.query('upgrade-pack', {
      filter: {
        courseId,
        from: runAttempt.runTier
      },
      fromRunAttemptId: runAttempt.id
    })

    return upgradePacks.find(up => up.to === 'PREMIUM')
  }

  @computed('fetchUpgradePack.last.value')
  get buyLink() {
    const upgradePack = this.fetchUpgradePack.last.value
    const user = this.currentUser.user
    const params = {
      productId: upgradePack.productId,
      oneauthId: user.oneauthId,
      meta: {
        toRunId: upgradePack.toRunId,//
        fromRunAttemptId: this.runAttempt.id,
      }
    }
    return `${config.dukaanUrl}/buy?` + $.param(params)
  }
}