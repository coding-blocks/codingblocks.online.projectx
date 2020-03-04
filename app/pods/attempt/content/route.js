import Route from "@ember/routing/route";
import { inject } from "@ember/service";
import { scheduleOnce } from "@ember/runloop";
import { defaultProgressValueForContent } from 'codingblocks-online/utils/content'

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
          include: 'lecture,video,document,code_challenge,webinar',
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

    const defaultProgressValue = defaultProgressValueForContent(content)
    const runAttempt = this.modelFor("attempt");

    const progress = (await content.get('progress')) || this.store.createRecord("progress", {
      status: defaultProgressValue,
      runAttempt: this.modelFor("attempt"),
      content
    })

    const changedToDone = progress.status === 'DONE' ? false : (defaultProgressValue == 'DONE')
    
    progress.set('status', progress.status === 'DONE' ? 'DONE' : defaultProgressValue)

    if (progress.isNew && changedToDone) {
      // a new "Done" progress is created
      runAttempt.incrementProperty("completedContents")
    }

    if (progress.status === 'UNDONE') {
      // user reset his progress and now has revisited this content
      progress.set("status", defaultProgressValue) 

      // if we mark it as done, we increment completedContents
      if (defaultProgressValue === 'DONE') 
        runAttempt.incrementProperty("completedContents");
    }
    
    // save progress and bind it content; binding part is necessary for now
    await progress.save().then(p => content.set("progress", p)).catch(err => {
      
    })

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
      if (!window.EMBER_LOADED) {
        scheduleOnce('afterRender', () => {
          document.getElementById('contentScrollContainer').scrollTo({
            top: document.getElementById('active-section-container').getBoundingClientRect().top + document.getElementById('contentScrollContainer').scrollTop - 180,
            behavior: 'smooth'
          })
          window.EMBER_LOADED = true
        })
      }
      
      // required to bubble this event up to parent routes
      return true
    }
  }
});
