import Component from '@ember/component';
import { action }  from '@ember/object';
import { inject as service } from '@ember/service';

export default class JobApplicationFormComponent extends Component {
  response = {}

  @service currentUser

  didReceiveAttrs() {
    this._super(...arguments)

    this.form.filter(formField => formField.prefill).forEach(formField => {
        this.response[formField.name] = this.get(`currentUser.user.${formField.prefill}`)
    })
  }

  @action 
  saveForm(obj) {
    const incomplete = this.form.find(formField => formField.required && !obj[formField.name])
    if (incomplete) {
      this.set('errors', ['Form Incomplete'])
      throw new Error('Form Incomplete')
    } else {
      this.submit(obj)
    }
  }

  @action
  reset () {
    this.set('response', {})
  }
  
}
