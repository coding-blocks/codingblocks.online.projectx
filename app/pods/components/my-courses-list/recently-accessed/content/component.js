import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MyCoursesListRecentlyAccessedContentComponent extends Component {
  @service api
  @computed('run.topRunAttempt.paused')
  get isPaused(){
    return this.run.topRunAttempt.paused
  }
  @computed('run.topRunAttempt.paused')
  get canBePaused(){
    return this.run.topRunAttempt.isPausable && !this.isPaused
  }

  @computed('progressPercent', 'run.topRunAttempt.paused')
  get progressState() {
    const percent = this.progressPercent
    const threshold =  this.run.completionThreshold || 75
    if (percent >= threshold)
      return 'completed'
    else if (this.isPaused)
      return 'paused'
    else if (percent > 0)
      return 'ongoing'
    else
      return 'not-started'
  }



  @computed('progressState')
  get fontClassName() {
    switch (this.progressState) {
      case 'completed': return 'green'
      case 'ongoing': return 'dark-orange'
      default: return ''
    }
  }

  @computed('progressState')
  get progressText() {
    switch (this.progressState) {
      case 'not-started': return 'Not Started'
      case 'paused': return 'Paused'
      default: return 'Ongoing'
    }
  }

  @computed('progressState')
  get showGetCertificate() {
    return this.progressState == 'completed'
  }

  @computed('progressState')
  get resumeButtonText() {
    return this.progressState == "not-started" ? "Start Learning": "Resume Course"
  }

  @action
  async pauseRunAttempt() {
    await this.get('api').request(`run_attempts/${this.run.topRunAttempt.id}/pause`, {
      method: 'PATCH'
    })
    this.set('showConfirmPause', false)
    return this.set('run.topRunAttempt.paused', true)
  }
  @action
  async unpauseRunAttempt() {
    await this.get('api').request(`run_attempts/${this.run.topRunAttempt.id}/unpause`, {
      method: 'PATCH'
    })
    this.set('showConfirmPause', false)
    return this.set('run.topRunAttempt.paused', false)
  }


}
