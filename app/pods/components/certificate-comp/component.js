import Component from '@ember/component';
import { alias, and } from '@ember/object/computed';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['h-100'],
  api: service(),

  run: alias('runAttempt.run'),
  courseCompleted: computed('run.completedContents', 'run.totalContents', function () {
    return (this.get('run.completedContents') / this.get('run.totalContents')) > 0.9
  }),
  canGenerate: and('courseCompleted', 'runAttempt.certificateApproved'),
  generateCertificateTask: task(function * () {
    yield this.get('api').request('certificates', {
      method: 'POST',
      data: {
        runAttemptId: this.get('runAttempt.id')
      }
    })

    this.set('generationRequested', true)
  })
});
