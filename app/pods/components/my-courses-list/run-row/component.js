import Component from '@ember/component';
import { computed } from '@ember/object'
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class CourseBasicInfo extends Component {
  @service api

  @alias("run.course") course
  tick = 0

  constructor() {
    super(...arguments)
    const intervalId = window.setInterval(() => {
      this.incrementProperty('tick')
    }, 1000)
    this.set('intervalId', intervalId)
  }

  @computed ('course.instructors.@each.name')
  get instrcutorNames () {
    return this.get('course.instructors').mapBy('name').join(', ')
  }

  @computed('run.topRunAttempt.{end,paused,lastPausedAt}', 'tick')
  get expiryDate() {
    const runAttempt = this.run.topRunAttempt
    const { paused, lastPausedAt, pauseTimeLeft, end } = runAttempt
    const now = new Date()
    const offset = paused ? Math.min(Math.floor((now - lastPausedAt)/1000), pauseTimeLeft/1000) : 0
    return moment.unix(end + offset).format("DD MMM YYYY HH:mm:ss")
  }

  willDestroyElement() {
    this._super(...arguments)
    window.clearInterval(this.intervalId)
  }
}
