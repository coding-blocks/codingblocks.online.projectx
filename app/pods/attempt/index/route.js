import Route from "@ember/routing/route"
import { conditionalRace } from 'codingblocks-online/utils/promises'
import { hash } from 'rsvp'

export default Route.extend({
  model() {
    return this.modelFor("attempt");
  },
  async afterModel(model) {

    const runAttempt = model

    const run = runAttempt.get("run")

    if (!run.get("sections.length")) {
      // empty length
      this.transitionTo("error", {
        queryParams: {
          errorCode:'NO_CONTENT'
        }
      })
    }

    const contentsPromises = run.get('sections').map(section => hash({section, contents: section.get('contents')}))
    const result = await conditionalRace (contentsPromises, ({section}) => {
      return !section.get("isProgressCompleted") && section.get('contents').find(content => content.get('payload.id'))
    })

    let section, content 
    if (!result) {
      // no sections to resume
      section = run.get("sections.firstObject")
      content = section.get("contents.firstObject")
    } else {
      section = result.section
      content = result.section.get("contents").find(content => !content.get('isDone') && content.get('payload.id'))
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
