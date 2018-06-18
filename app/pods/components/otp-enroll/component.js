import Component from '@ember/component';
import { computed, action } from 'ember-decorators/object'
import { service } from 'ember-decorators/service'
import { task } from 'ember-concurrency'

export default class otpEnrollComponent extends Component {
  @service api

  otpSent = false
  otpVerified = false
  userInput = ''
  email = null
  errorString = null

  sendOtpTask = task (function * () {
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
    .catch(err => displayError(err))
  })

  verifyOtpTask = task (function * () {
    return this.get('api').request('otp/verify', {
      method: "POST",
      data: {
        email: this.get('email'),
        otp: this.get('userInput')
      }
    }).then( () => {
      window.location.reload()
    }).catch(err => displayError(err))
  })

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
  
  displayError (error) {
    try {
      const err = JSON.parse(error);
      if (err.code === 500)
        this.set('errorString', 'Incorrect OTP');
      else if (err.code === 400)
        this.set('errorString', err.message);
      else this.set('errorString', 'Unknown Error');
    }  
    catch(e) {
      this.set('errorString', 'Unknown Error');
    }
  }
}