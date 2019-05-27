import Component from '@ember/component';
import { action }  from '@ember-decorators/object';

export default class JobApplicationFormComponent extends Component {
  response = {}

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
