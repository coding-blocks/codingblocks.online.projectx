import Component from '@ember/component';
import { computed }  from '@ember/object';

export default Component.extend({
  source: computed('submission.source', function () {
    return window.atob(this.get('submission.source') || '')
  })
});
