import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginBlockerController extends Controller {
  @service api
  @service session
  @service currentUser
  
  queryParams = ['token']
  token = null


  @action
  async logoutFromAll() {
    const response = await this.api.request('/jwt/logoutAll', {
      headers: {
        'Authorization': `JWT ${this.token}`
      }
    })
    await this.session.authenticate('authenticator:jwt-direct', response)
    await this.currentUser.load()

    const user = this.currentUser.user

    if(user.get('organization')) {
      this.transitionTo(user.get('organization'))
    }

    // window.location.href = '/app/'
  }
}
