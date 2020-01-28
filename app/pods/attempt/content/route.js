import Route from "@ember/routing/route";
import { inject } from "@ember/service";
import { scheduleOnce } from "@ember/runloop";

export default Route.extend({
  api: inject(),
  currentUser: inject(),
  headData: inject(),
  async beforeModel() {
    const params = this.paramsFor('attempt.content')
    const section = this.store.peekRecord('section', params.sectionId)
    return section.get('contents')
  },
  model (params) {
      return this.store.peekRecord('content', params.contentId, {
          include: 'lecture,video,document,code_challenge',
          reload: true
      })
  },
  setupController(controller) {
      this._super(...arguments)
      controller.set('run', this.modelFor('attempt').get('run'))
      controller.set('course', this.modelFor('attempt').get('run.course'))
  },  
  async afterModel(content) {
    const courseTitle = this.modelFor('attempt').get('run.course.title')
    this.headData.set('title', `${courseTitle} | ${content.title}`)

    if (!content.get("payload.id")) {
      // we don't have content; so a locked page will be shown
      return;
    }

    if (!content.get("isDone")) {
      // create progress for this
      if (await content.get("progress")) {
        const progress = await content.get("progress");
        content.get("contentable") === "code-challenge"
          ? progress.set("status", "ACTIVE")
          : progress.set("status", "DONE");
        await progress.save().then(p => content.set("progress", p));
      } else {
        const newProgress = this.store.createRecord("progress", {
          status:
            content.get("contentable") === "code-challenge" ? "ACTIVE" : "DONE",
          runAttempt: this.modelFor("attempt"),
          content
        });
        await newProgress.save().then(p => content.set("progress", p));
      }

      if (content.get("isDone")) {
        // Increment the completed content count in run attempt as well
        const runAttempt = this.modelFor("attempt");
        runAttempt.incrementProperty("completedContents");
      }
    }
    if (content.get("contentable") === "code-challenge") {
      const response = await this.api.request("hb/jwt");
      this.set("currentUser.user.hackJwt", response.jwt);
    }
  },

  actions: {
    didTransition() {
      //scroll content player to top
      document
        .getElementById("timelineContainer")
        .scrollTo({ top: 0, behavior: "smooth" });

      // scroll table of contents
      scheduleOnce('afterRender', () => {
        document.getElementById('contentScrollContainer').scrollTo({
          top: document.getElementById('active-section-container').getBoundingClientRect().top + document.getElementById('contentScrollContainer').scrollTop  - 180,
          behavior: 'smooth'
        })
      })
    }
  }
});
