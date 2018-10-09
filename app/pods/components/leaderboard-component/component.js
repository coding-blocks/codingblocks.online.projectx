import Component from '@ember/component';
import { service } from 'ember-decorators/service'

export default class LeaderboardComponent extends Component {

  @service store
  @service hbApi

  didReceiveAttrs () {
    this._super(...arguments)
    const code = this.get('code')
    const run = this.get('run')
    this.get('hbApi').request('submissions/leaderboard', {
      data: {
        contest_id: run.get("contestId"),
        problem_id: code.get("hbProblemId")
      }
    }).then(result => {
      this.get('store').unloadAll('submission')
      this.get('store').pushPayload(result)
      this.set('submissions', this.get('store').peekAll('submission'))
    })
  }

}
