import Component from '@ember/component';
import { computed } from '@ember/object';

export default class PerformanceStatsView extends Component {
  options = {
    legend: {
      display: false
    }, 
  }

  @computed('stats', 'gradient')
  get performanceData() {
    return {
      labels: this.stats.averageProgress.map((_, i) => `${i+1}`),
      datasets: [
        {
          label: 'My Progress',
          data: this.stats.userProgress.map(_ => _.progress),
          borderColor:               this.gradient,
          pointBorderColor:          this.gradient,
          pointHoverBorderColor:     this.gradient,
          pointRadius:               0,
          fill:                      false
          // borderWidth: 5
        },
        {
          label: 'Average Progress',
          data: this.stats.averageProgress.map(_ => _.progress),
          borderColor:               this.gradient,
          pointBorderColor:          this.gradient,
          pointHoverBorderColor:     this.gradient,
          pointRadius:               0,
          fill:                      false
          // borderWidth: 5
        },
      ]
    }
  }

  didInsertElement() {
    const ctx = document.getElementsByTagName('canvas')[0].getContext("2d")
    const gradient = ctx.createLinearGradient(200, 0, 100, 0)
    gradient.addColorStop(0, '#fa8733')
    gradient.addColorStop(1, '#f7c332')
    this.set('gradient', gradient)
  }
}
