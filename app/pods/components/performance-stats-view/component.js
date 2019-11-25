import Component from '@ember/component';

export default class PerformanceStatsView extends Component {
  options = {
    legend: {
      display: false
    }, 
  }

  performanceData = {
    labels: ['a', 'a', 'a', 'a', 'a', 'a'],
    datasets: [
      {
        label: '',
        data: [10, 20, 30, 40, 60, 80],
        pointHoverBackgroundColor: 'white',
        pointHoverBorderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 5,
        // borderWidth: 5
      }
    ]
  }
}
