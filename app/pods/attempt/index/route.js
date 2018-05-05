import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    // return this.modelFor("attempt");
  },
  afterModel(model) {
    const runAttempt = model;

    const course = runAttempt.get("run.course");
    const section = course.get("sections").find(section => {
      return !section.get("isProgressCompleted");
    });
    const content = section.get("contents").find(content => {
      return !content.get("isDone");
    });
    this.transitionTo(
      "attempt.content",
      runAttempt.get("id"),
      content.get("id")
    );
  }
});
