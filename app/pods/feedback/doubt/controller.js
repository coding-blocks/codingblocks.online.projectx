import Controller from '@ember/controller';
import { action } from '@ember/object'

export default class FeedbackDoubtController extends Controller {
  @action
  sayThankYou () {
    this.transitionToRoute("feedback.thanks")
  }
}
