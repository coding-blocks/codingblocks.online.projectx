import { alias } from '@ember/object/computed';
import Controller from "@ember/controller";
import { computed } from "@ember/object";
import { inject as service } from '@ember/service';

export default Controller.extend({
  queryParams: ['tab', 'start'],
  currentUser: service(),

  store: service(),
  tab: "problem",
  start: 0,

  componentName: computed("content.contentable", function() {
    const contentable = this.get("content.contentable");

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
      case "csv":
        return "player-csv"
    }
  }),
  course: alias('runAttempt.run.course'),
  run: alias('runAttempt.run'),
  showFeedback: computed('content', function() {
    return !this.get('content.isFeedbackDone')
  }),
  actions: {
    toggleSideBar(){
      this.attemptController.toggleProperty('sideBarCollapsed.right')
      this.attemptController.set('sideBarCollapsed.left', true);
    },
    transitionToDashboard() {
      this.transitionToRoute(
        "classroom.timeline",
        this.get("runAttempt.run.course.id"),
        this.get("runAttempt.run.id")
      );
    },
    async transitonToNextContent() {
      let section = await this.store.peekRecord('section', this.get('sectionId'));
      let nextContent = null;


      const indexOfThisContent = section
        .get("contents")
        .indexOf(this.content);

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
    },
    async submitFeedback(feedback) {
      let progress = await this.get('content.progress')
      progress.set('feedbackStatus', feedback)
      progress.save()
    }
  }
});
