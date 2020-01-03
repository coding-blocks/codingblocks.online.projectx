import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Quiz extends Controller {
  @service router

  @alias('runAttempt.run.course') course
  @alias('router.currentRouteName') routeName

  @computed('routeName')
  get hideTabNav() {
    return this.routeName.indexOf('quiz.attempt') !== -1
  }

  @action
  transitionToDashboard() {
    this.transitionToRoute(
      "classroom.timeline",
      this.get("runAttempt.run.course.id"),
      this.get("runAttempt.run.id")
    );
  }
}
