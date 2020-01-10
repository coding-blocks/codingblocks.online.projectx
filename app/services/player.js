import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';

const byFieldValue = (field, value) => _ => _[field] == value
const byNameValue = val => byFieldValue("name", val)

const byNameAttempt = byNameValue("attempt")
const byNameContent = byNameValue("attempt.content")

export default class PlayerService extends Service {
  @service router
  @service store

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
  @action
  async transitionToNextContent() {
    const runAttempt = this.store.peekRecord('run-attempt', this.runAttemptId)
    const currentSection = this.store.peekRecord('section', this.sectionId)
    const currentContent = this.store.peekRecord('content', this.contentId)
    const contents = await currentSection.get('contents')

    let nextContent = null
    let nextSection = null

    const indexOfThisContent = contents.indexOf(currentContent);

    if (indexOfThisContent === currentSection.get("contents.length") - 1) {
      const indexOfThisSection = runAttempt.get("run.course.sections").indexOf(currentSection);
      nextSection = this.get("runAttempt.run.course.sections").objectAt(indexOfThisSection + 1)
      nextContent = (await nextSection.get("contents")).objectAt(0);
    } else {
      nextSection = currentSection
      nextContent = contents.objectAt(indexOfThisContent + 1);
    }

    this.router.replaceWith('attempt.content', nextSection.id, nextContent.id)
  }

  @action
  transitionToPreviousContent() {}
}
