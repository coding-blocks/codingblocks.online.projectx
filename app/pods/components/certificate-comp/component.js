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
    return (this.get('run.completedContents') / this.get('run.totalContents')) > 0.9
  }),
  certificateNotPresent: not('runAttempt.certificate'),
  canGenerate: and('courseCompleted', 'runAttempt.certificateApproved'),
  generateCertificateTask: task(function * () {
    yield this.get('api').request('certificates', {
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
      this.get('router').transitionTo('certificate', `CBOL-${this.get('runAttempt.id')}-${salt}`)
    }
  }
});
