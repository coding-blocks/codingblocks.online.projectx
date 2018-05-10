import Controller from '@ember/controller';
import { action } from 'ember-decorators/object'

export default class ContentController extends Controller {
    @action
    transitionToContent (contentId) {
      debugger;
      this.transitionToRoute('attempt.content', this.get('run.topRunAttempt.id'), contentId)
    }
}