import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';

const byFieldValue = (field, value) => _ => _[field] == value
const byNameValue = val => byFieldValue("name", val)

const byNameAttempt = byNameValue("attempt")
const byNameContent = byNameValue("attempt.content")

const getObjectFromLocalStorage = (key, def= {}) => {
  try {
    return JSON.parse(window.localStorage.getItem(key)) || def
  } catch (e) {
    console.error(new Error('Malformed localstorage value:', key))
    window.localStorage.removeItem(key)
    return def
  }
}
const setObjectToLocalStorage = (key, obj) => window.localStorage.setItem(key, JSON.stringify(obj))

export default class PlayerService extends Service {
  @service router
  @service store

  isFullscreen = false

  constructor() {
    super(...arguments)
    document.addEventListener('fullscreenchange', event => {
      const el = document.getElementById('player-content-fullscreen-container')
      if (document.fullscreenElement === null) {
        try {
          this.cleanupDomEnhancementForFullScreen()
        } catch (e) {
          console.error(e)
        } finally {
          this.set('isFullscreen', false)
        }
      }
      else if (el && el == document.fullscreenElement) {
        this.set('isFullscreen', true)
        this.enhanceDomForFullScreen()
      }
    })
  }

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

  enhanceDomForFullScreen() {
    window.setTimeout(() => { // dirty hack to get around some browsers f--ing up 'fullscreenchange' 
      $('.c-code-challenge').children().first().resizable({
        handleSelector: ".splitter",
        resizeHeight: false
      })
    }, 0) 
  }

  cleanupDomEnhancementForFullScreen() {
    //Cleanup any dom changes after user exit fullscreen;
    const el = $('.c-code-challenge').children().first()
    el.resizable('destroy')
    el.css("width", "unset") //  was expecting this jquery plugin to cleanup this too, but can't seem to find anything
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

    Ember.getOwner(this).lookup('router:main').transitionTo('attempt.content', nextSection.id, nextContent.id) // because router service sucks
    // jokes aside: it has do something with query params on routes
    // ember router service behavious differently with qp
    // this.router.transitionTo('attempt.content', nextSection.id, nextContent.id)
  }

  @action
  transitionToPreviousContent() { }
  
  @action
  goFullScreen() {
    const el = document.getElementById('player-content-fullscreen-container')
    if (!this.isActive || !el) {
      return console.error(`Can't go fullscreen. Either player service is inactive or container element(#player-content-fullscreen-container) not found ${el}`)
    }
    try {
      el.requestFullscreen()
    } catch (err) {
      return console.error(`Can't request fullscreen on element. `, err)
    }
  }

  @action
  exitFullScreen() {
    // do nothing now
  }

  @action
  setResumeTime(time) {
    const { runAttemptId, sectionId, contentId } = this

    setObjectToLocalStorage(`player_resume_time:${runAttemptId}`, {
      sectionId,
      contentId,
      time
    })
  }

  @action
  getResumeTimeForCurrentContent() {
    const { runAttemptId } = this
    const { sectionId, contentId, time } = getObjectFromLocalStorage(`player_resume_time:${runAttemptId}`)
    const matchesCurrentContent = sectionId == this.sectionId && contentId == this.contentId
    return matchesCurrentContent ? time : 0
  }

}
