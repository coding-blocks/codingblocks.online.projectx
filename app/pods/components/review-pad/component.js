import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';

export default Component.extend({
  circleClassNames: computed('submission', function () {
    const submission = this.submission
    return this.questions.map(question => {
      if (!Array.isArray(submission)) {
        return ''
      }
  
      const questionSubmission = submission.find(el => el.id == question.get('id'))
      if (!questionSubmission || !questionSubmission['marked-choices'].length) {
        return ''
      } else {
        return 'bg-green'
      }
    });
  })
});
