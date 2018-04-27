import Component from "@ember/component";
import { action } from "ember-decorators/object";
import { service } from "ember-decorators/service";
import { isNone } from '@ember/utils';
import { task } from "ember-concurrency";

/* params: {
    course
  }
*/

export default class FeedbackComponent extends Component {
  @service store
  @service currentUser

  didReceiveAttrs () {
    this._super (...arguments)
    let feedback = this.get('feedback')
    if (isNone(feedback)) {
      feedback = this.get("store").createRecord('feedback')
      this.set('feedback', feedback)
    }
  }

  saveFeedbackTask = task(function * () {
    const feedback = this.get('feedback')
    feedback.set("course", this.get('course'))
    feedback.set("user", this.get('currentUser.user'))
    yield feedback.save()
  })

  @action
  saveFeedback () {
    this.get('saveFeedbackTask').perform()
  }
  @action
  changeToEditMode () {
    this.set("feedback.text", this.get('feedback.text') + ' ')
  }
}
