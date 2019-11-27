import Component from '@ember/component';
import { computed } from '@ember/object';

export default class PerformanceStatsView extends Component {
  options = {
    legend: {
      display: false
    }, 
  }

  @computed('stats')
  get performanceData() {
    return {
      labels: this.stats.averageProgress.map((_, i) => `${i+1}`),
      datasets: [
        {
          label: 'My Progress',
          data: this.stats.userProgress.map(_ => _.progress),
          borderColor:               this.gradient,
          pointBorderColor:          this.gradient,
          pointHoverBorderColor:     this.gradient
          // borderWidth: 5
        },
        {
          label: 'Average Progress',
          data: this.stats.averageProgress.map(_ => _.progress),
          borderColor:               this.gradient,
          pointBorderColor:          this.gradient,
          pointHoverBorderColor:     this.gradient
          // borderWidth: 5
        },
      ]
    }
  }

  didInsertElement() {
    const ctx = document.getElementsByTagName('canvas')[0].getContext("2d")
    const gradient = ctx.createLinearGradient(200, 0, 100, 0)
    gradient.addColorStop(0, '#ec6333')
    gradient.addColorStop(1, '#f19633')
    this.set('gradient', gradient)
  }
}
