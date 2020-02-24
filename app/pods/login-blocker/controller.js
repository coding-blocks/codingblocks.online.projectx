import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginBlockerController extends Controller {
  queryParams = ['token']

  token = null

  @service api

  @action
  async logoutFromAll() {
    await this.api.request('/jwt/logoutAll', {
      headers: {
        'Authorization': `JWT ${this.token}`
      }
    })
    window.location.href = '/'
  }
}
