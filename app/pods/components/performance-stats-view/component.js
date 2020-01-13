import Component from '@ember/component';
import { computed } from '@ember/object';

export default class PerformanceStatsView extends Component {
  options = {
    legend: {
      display: true
    }, 
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
