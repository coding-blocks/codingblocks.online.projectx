import Component from '@ember/component';
import env from 'codingblocks-online/config/environment';

export default class LoginButton extends Component {
    loginUrl = `${env.oneauthURL}/oauth/authorize?response_type=code&client_id=${env.clientId}&redirect_uri=${env.publicUrl}`
}
