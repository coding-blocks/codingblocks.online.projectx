import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

const byFieldValue = (field, value) => _ => _[field] == value
const byNameValue = val => byFieldValue("name", val)

const byNameAttempt = byNameValue("attempt")
const byNameContent = byNameValue("attempt.content")

export default class PlayerService extends Service {
  @service router

  /*
    Are we inside player?
  */
  @computed('router.currentRoute')
  get isActive() {
    return this.router.currentRoute && this.router.currentRoute.name.indexOf("attempt.") != -1
  }

  /*
    RunAttemptId of the course currently being consumed
  */
  @computed('isActive', 'router.currentRoute')
  get runAttemptId() {
    return this.isActive && this.router.currentRoute && this.router.currentRoute.find(byNameAttempt).params.runAttemptId
  }


  @computed('isActive', 'router.currentRoute')
  get contentRoute() {
    return this.isActive && this.router.currentRoute && this.router.currentRoute.find(byNameContent)
  }

  /*
    ContentId of currently viewing content at player/:runAttemptId/content/:sectionId/:contentId
  */
  @computed('contentRoute')
  get contentId() {
    return this.contentRoute && this.contentRoute.params.contentId
  }

  @computed('contentRoute')
  get sectionId() {
    return this.contentRoute && this.contentRoute.params.sectionId
  }


  //TODO:  transitionToNextContent(), transitionToPreviousContent()


}
