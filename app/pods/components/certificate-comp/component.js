import Component from '@ember/component';
import { alias, and, not, equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  api: service(),
  router: service(),
  showShareModal: false,
  run: alias('runAttempt.run'),
  courseCompleted: computed('progressPercent', 'run.completionThreshold', function () {
    return this.progressPercent > this.get('run.completionThreshold')
  }),
  progressPercent: alias('runAttempt.progressPercent'),
  certificateNotPresent: not('runAttempt.certificate'),
  canGenerate: and('courseCompleted', 'runAttempt.certificateApproved'),
  canRequest: alias('courseCompleted'),
  canDownload: equal('runAttempt.certificate.status', 'published'),
  generating: equal('certificateStatus', 'generating'),
  approvalRequested: alias('runAttempt.approvalRequested'),
  certificateStatus: alias('runAttempt.certificate.status'),

  requestApprovalTask: task(function *() {
    yield this.api.request(`run_attempts/${this.get('runAttempt.id')}/requestApproval`, {
      method: 'GET',
    })
    this.set('runAttempt.approvalRequested', true)
  }).drop(),
  actions: {
    downloadCertificate() {
      const salt = this.get('runAttempt.certificate.salt')
      this.router.transitionTo('certificate', `CBOL-${this.get('runAttempt.id')}-${salt}`)
    },
    toggleCollapse() {
      this.toggleProperty('collapsed');
    }
  }
});
