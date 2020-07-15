import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';


export default class ExcellenceCertificateModal extends Component {
  @service api

  @computed('excellenceCertificate')
  get canDownload() {
    if (this.excellenceCertificate)
      return this.excellenceCertificate.status == 'published'
    else
      return false
  }

  @computed('stats')
  get isQualifiedForExcellenceCertififcate() {
    return this.courseCompleted && (this.stats.performance.percentile > this.run.get('excellenceThreshold'))
  }

  @dropTask excellenceCertificateTask = function* () {
    yield this.api.request('certificates/excellence', {
      method: 'POST',
      data: {
        runAttemptId: this.get('runAttempt.id')
      }
    })
  }

  @action downloadCertificate() {
    if (this.excellenceCertificate)
      window.open(this.excellenceCertificate.url, '_blank')
  }

};