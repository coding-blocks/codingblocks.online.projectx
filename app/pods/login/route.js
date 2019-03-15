import Route from '@ember/routing/route'
import env from 'codingblocks-online/config/environment'
import { inject as service } from '@ember-decorators/service'

export default class LoginRoute extends Route {

  loginUrl = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${
    env.clientId
  }&redirect_uri=${env.publicUrl}`; 

  activate () {
    window.location.href = this.loginUrl
  }
}
