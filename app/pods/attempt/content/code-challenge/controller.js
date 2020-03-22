import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class CodeChallenge extends Controller {
  tabs = [
    {
      name: 'Problem',
      component: 'code-challenge/code-challenge-explanation'
    },
    {
      name: 'Submissions',
      component: 'code-challenge/code-challenge-submission'
    },
    {
      name: 'Leaderboard',
      component: 'code-challenge/code-challenge-leaderboard'
    },
    {
      name: 'Solution',
      component: 'code-challenge/code-challenge-solution'
    },
  ]

  @computed("content.id", "runAttempt.doubts")
  get relatedPendingDoubt () {
    return this.runAttempt.doubts.find(doubt => doubt.get('content.id') == this.content.get('id') && ['PENDING', 'ACKNOWLEDGED'].includes(doubt.get('status')))
  }

  @alias('hbContent.problem')
  problem
}
