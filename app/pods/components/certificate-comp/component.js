import Component from '@ember/component';
import { alias, and, not } from '@ember/object/computed';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['h-100'],
  api: service(),
  router: service(),

  run: alias('runAttempt.run'),
  courseCompleted: computed('run.completedContents', 'run.totalContents', function () {
    return (this.get('run.completedContents') / this.get('run.totalContents')) > (this.get('run.completionThreshold')/100)
  }),
  certificateNotPresent: not('runAttempt.certificate'),
  canGenerate: and('courseCompleted', 'runAttempt.certificateApproved'),
  requestApprovalTask: task(function *() {
    yield this.api.request(`run_attempts/${this.get('runAttempt.id')}/requestApproval`, {
      method: 'GET',
    })
    this.set('runAttempt.approvalRequested', true)
  }),
  generateCertificateTask: task(function * () {
    yield this.api.request('certificates', {
      method: 'POST',
      data: {
        runAttemptId: this.get('runAttempt.id')
      }
    })

    this.set('generationRequested', true)
  }),
  actions: {
    downloadCertificate () {
      const salt = this.get('runAttempt.certificate.salt')
      this.router.transitionTo('certificate', `CBOL-${this.get('runAttempt.id')}-${salt}`)
    }
  }
});
