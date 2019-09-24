import Route from '@ember/routing/route'
import env from 'codingblocks-online/config/environment'
import { getPublicUrl } from "codingblocks-online/utils/browser"


export default class LoginRoute extends Route {

  loginUrl = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${
    env.clientId
  }&redirect_uri=${getPublicUrl()}`; 

  activate () {
    window.location.href = this.loginUrl
  }
}
