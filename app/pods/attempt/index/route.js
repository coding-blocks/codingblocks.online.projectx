import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    return this.modelFor("attempt");
  },
  afterModel(model) {
    const runAttempt = model;

    const course = runAttempt.get("run.course");

    if (!course.get("sections.length")) {
      // empty length
      this.transitionTo("error", {
        queryParams: {
          errorCode:'NO_CONTENT'
        }
      })
    }

    let section = course.get("sections").find(section => {
      return !section.get("isProgressCompleted");
    });
    let content ;
    if (!section || !section.id) {
      // no sections to resume
      section = course.get("sections").objectAt(0) 
      content = section.get("contents").objectAt(0)
    } else {
      content = section.get("contents").find(content => {
        return !content.get("isDone");
      });
    }
    this.transitionTo(
      "attempt.content",
      runAttempt.get("id"),
      content.get("id")
    );
  }
});
