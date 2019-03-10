import Component from '@ember/component';
import { computed, action } from '@ember-decorators/object'
import { inject as service } from '@ember-decorators/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { isBadRequestError } from 'ember-ajax/errors';
import { not } from '@ember-decorators/object/computed';


export default class otpEnrollComponent extends Component {
  @service api
  @service currentUser

  // hide this component if user belongs to an org
  @not('currentUser.organization') isVisible

  otpSent = false
  otpVerified = false
  userInput = ''
  email = null
  errorString = null

  @restartableTask
  *sendOtpTask() {
    return this.get('api').request('otp/request', {
      method: 'POST',
      data: {
        email: this.get('userInput')
      }
    })
    .then( () => {
      this.set('email', this.get('userInput'))
      this.set('userInput', '');
      this.set('errorString', null)
      this.set('otpSent', true);
    })
    .catch(err => {
      if (isBadRequestError(err)) {
        this.set('errorString', err.payload.message)
      } else {
        this.set('errorString', 'Cannot Sent OTP to that email, some internal error occured. Contact at support@codingblocks.com')
      }
      console.error(err)
    })
  }

  @restartableTask
  *verifyOtpTask() {
    return this.get('api').request('otp/verify', {
      method: "POST",
      data: {
        email: this.get('email'),
        otp: this.get('userInput')
      }
    }).then( () => {
      window.location.reload()
    }).catch(err => {
      if (isBadRequestError(err)) {
        this.set('errorString', err.payload.message)
      } else {
        this.set('errorString', 'Incorrect OTP')
      }
      console.error(err)
    })
  }

  @computed ('otpSent')
  get placeholderText () {
    return this.get('otpSent') ? 'Enter OTP' : 'Enter your registered Email'
  }

  @computed ('otpSent')
  get buttonText () {
    return this.get('otpSent') ? 'Enroll Now' : 'Send OTP'
  }

  @action
  handleClick () {
    if (this.get('otpSent'))
      return this.get('verifyOtpTask').perform()
    else
      return this.get('sendOtpTask').perform()
  }
  
}