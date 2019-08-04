import Component from '@ember/component';
import { alias, and, not, equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default Component.extend({
  api: service(),
  router: service(),

  collapsed: true,
  run: alias('runAttempt.run'),
  courseCompleted: computed('progress', 'run.completionThreshold', function () {
    const courseCompleted = this.progress.then(progress => {
      return progress.completedContents / progress.totalContents > (this.get('run.completionThreshold')/100)
    })
    return DS.PromiseObject.create({
      promise: courseCompleted
    })
  }),
  progress: computed('runAttempt', function () {
    return DS.PromiseObject.create({
      promise: this.api.request(`run_attempts/${this.runAttempt.id}/progress`)
    })
  }),
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
  generateCertificateTask: task(function * () {
    yield this.api.request('certificates', {
      method: 'POST',
      data: {
        runAttemptId: this.get('runAttempt.id')
      }
    })
    this.set('generationRequested', true)
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
