import Component from '@ember/component';
import { alias, and, not, equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  api: service(),
  router: service(),
  showShareModal: false,
  showExcellenceCertificateModal: false,
  run: alias('runAttempt.run'),
  courseCompleted: computed('progressPercent', 'run.completionThreshold', function () {
    return this.progressPercent > this.get('run.completionThreshold')
  }),
  goldenLogo: alias('runAttempt.run.course.goldenLogo'),
  progressPercent: alias('runAttempt.progressPercent'),
  certificateNotPresent: not('runAttempt.completionCertificate'),
  canGenerate: and('courseCompleted', 'runAttempt.certificateApproved'),
  canRequest: alias('courseCompleted'),
  canDownload: equal('runAttempt.completionCertificate.firstObject.status', 'published'),
  generating: equal('certificateStatus', 'generating'),
  approvalRequested: alias('runAttempt.approvalRequested'),
  certificateStatus: alias('runAttempt.completionCertificate.firstObject.status'),

  excellenceCertificateAllowed: computed('goldenLogo', 'runAttempt.runTier', function () {
    return this.goldenLogo && this.get('runAttempt.runTier') != 'LITE'
  }),

  requestApprovalTask: task(function *() {
    yield this.api.request(`run_attempts/${this.get('runAttempt.id')}/requestApproval`, {
      method: 'GET',
    })
    this.set('runAttempt.approvalRequested', true)
  }).drop(),
  generateCertificateTask: task(function * () {
    yield this.api.request('certificates', {
      method: 'POST',
      data: {
        runAttemptId: this.get('runAttempt.id')
      }
    })
    this.set('generationRequested', true)
    this.set('showCertificateGenerationBlocker', false)
  }).drop(),
  actions: {
    downloadCertificate() {
      const salt = this.get('runAttempt.completionCertificate.salt')
      this.router.transitionTo('certificate', `CBOL-${this.get('runAttempt.id')}-${salt}`)
    },
    toggleCollapse() {
      this.toggleProperty('collapsed');
    }
  },
  async init() {
    this._super(...arguments)
    let stats = await this.api.request(`progresses/stats/${this.runAttempt.id}`)
    this.set('stats', stats)
  }
});
