import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from "@ember/object";

export default Controller.extend({
  course: alias('runAttempt.run.course'),
  actions: {
    transitionToDashboard() {
      this.transitionToRoute(
        "classroom.timeline",
        this.get("runAttempt.run.course.id"),
        this.get("runAttempt.run.id")
      );
    }
  }
});
