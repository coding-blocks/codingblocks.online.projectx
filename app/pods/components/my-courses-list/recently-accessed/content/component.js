import Component from '@ember/component';
import { computed } from '@ember/object';

export default class MyCoursesListRecentlyAccessedContentComponent extends Component {
  @computed('progressPercent')
  get progressState() {
    const percent = this.progressPercent
    const threshold =  this.run.completionThreshold || 75
    if (percent >= threshold)
      return 'completed'
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

}
