import Controller from "@ember/controller";
import { computed } from "@ember/object";

export default Controller.extend({
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
    }
  }),
  actions: {
    transitionToDashboard() {
      this.transitionToRoute(
        "classroom.timeline",
        this.get("runAttempt.run.course.id"),
        this.get("runAttempt.run.id")
      );
    },
    async transitonToNextContent() {
      const section = await this.get("content.section");
      let index = -1;
      let sectionIndex = -1;
      let nextContent = -1;

      const indexOfThisContent = section
        .get("contents")
        .indexOf(this.get("content"));

      if (indexOfThisContent === section.get("contents.length") - 1) {
        const indexOfThisSection = this.get(
          "runAttempt.run.course.sections"
        ).indexOf(section);
        nextContent = this.get("runAttempt.run.course.sections")
          .objectAt(indexOfThisSection + 1)
          .get("contents")
          .objectAt(0);
      } else {
        nextContent = section.get("contents").objectAt(indexOfThisContent + 1);
      }
      this.transitionToRoute(
        "attempt.content",
        this.get("runAttempt.id"),
        nextContent.get("id")
      );
    }
  }
});
