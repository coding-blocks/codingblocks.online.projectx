import Controller from '@ember/controller';

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
}
