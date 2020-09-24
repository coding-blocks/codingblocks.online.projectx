import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { equal } from '@ember/object/computed';


export default class ExcellenceCertificateModal extends Component {
  @service api

  certificateRequested = false

  @equal('excellenceCertificate.status', 'published') canDownload
  @equal('excellenceCertificate.status', 'generating') isGenerating

  @computed('stats')
  get isQualifiedForExcellenceCertififcate() {
    return this.courseCompleted && (this.stats.performance.score > this.run.get('excellenceThreshold'))
  }

  @dropTask excellenceCertificateTask = function* () {
    yield this.api.request('certificates/excellence', {
      method: 'POST',
      data: {
        runAttemptId: this.get('runAttempt.id')
      }
    })

    this.set('excellenceCertificate', {
      status: 'generating'
    })
  }

  @action downloadCertificate() {
    window.open(this.excellenceCertificate.url, '_blank')
  }

};