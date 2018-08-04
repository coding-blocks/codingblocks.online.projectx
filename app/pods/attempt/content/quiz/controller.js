import Controller from '@ember/controller';
import { computed } from "@ember/object";

export default Controller.extend({
  course: computed.alias('runAttempt.run.course'),
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
