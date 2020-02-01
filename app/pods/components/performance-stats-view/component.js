import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PerformanceStatsView extends Component {
  @service currentUser

  options = {
    legend: {
      display: true,
      labels: {
        usePointStyle: true,
        boxWidth: 20,
        fontSize: 10
      }
    }, 
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Progress'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: '# of Weeks'
        }
      }],
    }
  }

  @computed('stats.leaderboard')
  get leaderboardCount() {
    return this.stats.leaderboard.length
  }

  @computed('stats.leaderboard')
  get myRank() {
    const rank = this.stats.leaderboard.findIndex(_ => _.id === this.currentUser.user.id)
    return rank > 0 ? rank + 1 : null
  }

  @computed('stats', 'orangeGradient', 'greenGradient')
  get performanceData() {
    return {
      labels: this.stats.averageProgress.map((_, i) => `${i+1}`),
      datasets: [
        {
          label: 'My Progress',
          data: this.stats.userProgress.map(_ => _.progress),
          borderColor:               this.greenGradient,
          pointBorderColor:          this.greenGradient,
          pointHoverBorderColor:     this.greenGradient,
          pointRadius:               0,
          fill:                      false
          // borderWidth: 5
        },
        {
          label: 'Average Progress',
          data: this.stats.averageProgress.map(_ => _.progress),
          borderColor:               this.orangeGradient,
          pointBorderColor:          this.orangeGradient,
          pointHoverBorderColor:     this.orangeGradient,
          pointRadius:               0,
          fill:                      false
          // borderWidth: 5
        },
      ]
    }
  }

  didInsertElement() {
    const ctx = document.getElementsByTagName('canvas')[0].getContext("2d")
    
    // orange gradient
    const orangeGradient = ctx.createLinearGradient(200, 0, 100, 0)
    orangeGradient.addColorStop(0, '#fa8733')
    orangeGradient.addColorStop(1, '#f7c332')
    this.set('orangeGradient', orangeGradient)

    // green gradient
    const greenGradient = ctx.createLinearGradient(200, 0, 100, 0)
    greenGradient.addColorStop(0, '#83db3b')
    greenGradient.addColorStop(1, '#26a87c')
    this.set('greenGradient', greenGradient)
  }
}
