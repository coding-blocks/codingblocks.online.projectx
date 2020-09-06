import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const NOOP = () => {}

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

     // already someone else is logged; this might happen while impersonating
    const afterLogin = this.session.data?.authenticated ? () => window.location.href = "/app/" : NOOP
    await this.session.authenticate('authenticator:jwt-direct', response)

    await this.currentUser.load()

    const user = this.currentUser.user

    if(user.get('organization')) {
      this.transitionTo(user.get('organization'))
    }

    afterLogin()
  }
}
