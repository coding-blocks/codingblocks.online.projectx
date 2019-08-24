import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isBadRequestError, isNotFoundError } from 'ember-fetch/errors';

export default Route.extend({
  api: service(),
  model ({licenseKey}) {
    return this.api.request('certificates/' + licenseKey);
  },
  actions: {
    error (error, transition) {
      if (isBadRequestError(error) || isNotFoundError(error)) {
        // https://github.com/emberjs/ember.js/issues/12624
        this.intermediateTransitionTo('404', 'DONOT_REMOVE_ME')
      } else 
        throw error;
    }
  }
});
