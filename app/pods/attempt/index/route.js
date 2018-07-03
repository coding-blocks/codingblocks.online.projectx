import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    return this.modelFor("attempt");
  },
  afterModel(model) {

    const runAttempt = model;

    const run = runAttempt.get("run");

    if (!run.get("sections.length")) {
      // empty length
      this.transitionTo("error", {
        queryParams: {
          errorCode:'NO_CONTENT'
        }
      })
    }

    let section = run.get("sections").find(section => {
      return !section.get("isProgressCompleted");
    });
    let content ;
    if (!section || !section.id) {
      // no sections to resume
      section = run.get("sections").objectAt(0)
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
    , {
      queryParams: {
        s: section.get('id')
      }
    });
  }
});
