import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service'

export default Component.extend({
  api : service(),
  actions:{
    async unpauseRunAttempt() {
      await this.get('api').request(`run_attempts/${this.runAttempt.id}/unpause`, {
        method: 'PATCH'
      })
      return this.runAttempt.reload()
    }
  },
});
