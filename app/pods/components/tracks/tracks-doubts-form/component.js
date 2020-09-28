import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';


export default class TracksDoubtsFormComponent extends Component {
  alreadySent = false
  name = null
  mobile = null
  email = null
  doubt = null

  @service api

  @dropTask createLeadTask = function *() {
    try {
      yield this.api.request('/hubspot/lead', {
        method: 'POST',
        data: {
          data: {
            name: this.name,
            mobile: this.mobile,
            email: this.email,
            doubt: this.doubt,
            course: 'Tracks',
          },
          meta: {
            pageUri: window.location.href,
            pageName: "Web: Tracks"
          }
        }
      })
  
      this.set('alreadySent', true)
    } catch (err) {
      this.set('error', err.payload.message)
    }
  }
}
