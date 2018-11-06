import Controller from "@ember/controller";
import { computed } from "@ember/object";
import { inject as service } from '@ember/service';

export default Controller.extend({
  queryParams: ['tab', 'start'],

  store: service(),
  tab: "problem",
  start: 0,

  componentName: computed("model.contentable", function() {
    const contentable = this.get("model.contentable");

    switch (contentable) {
      case "lecture":
        return "player-lecture";
      case "document":
        return "player-document";
      case "video":
        return "player-video";
      case "code-challenge":
        return "player-code-challenge";
      case "qna":
        return "player-qna"
    }
  }),
  course: computed.alias('runAttempt.run.course'),
  run: computed.alias('runAttempt.run'),
  actions: {
    transitionToDashboard() {
      this.transitionToRoute(
        "classroom.timeline",
        this.get("runAttempt.run.course.id"),
        this.get("runAttempt.run.id")
      );
    },
    async transitonToNextContent() {
      let section = await this.get('store').peekRecord('section', this.get('sectionId'));
      let nextContent = null;


      const indexOfThisContent = section
        .get("contents")
        .indexOf(this.get("content"));

      if (indexOfThisContent === section.get("contents.length") - 1) {
        const indexOfThisSection = this.get("runAttempt.run.course.sections").indexOf(section);
        section = this.get("runAttempt.run.course.sections").objectAt(indexOfThisSection + 1)
        nextContent = section.get("contents").objectAt(0);
      } else {
        nextContent = section.get("contents").objectAt(indexOfThisContent + 1);
      }
      this.transitionToRoute(
        "attempt.content",
        this.get("runAttempt.id"),
        nextContent.get("id")
      , {
        queryParams: {
          s: section.get('id')
        }
      });
    }
  }
});
