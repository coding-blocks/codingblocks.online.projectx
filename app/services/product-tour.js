import Service from '@ember/service'
import { inject as service } from '@ember/service';
import courseDashboardsSteps from '../data/course-dashboard'
import contentPlayerSteps from '../data/content-player'

export const defaultStepOptions = {
  classes: 'shepherd-theme-arrows custom-default-class',
  scrollTo: {
    behavior: 'smooth',
    block: 'center'
  },
  cancelIcon: {
    enabled: true
  },

  tippyOptions: {
    duration: 500
  }
}

const tourDefaults = {
  defaultStepOptions,
  disableScroll: true,
  modal: true,
  styleVariables: {
    // Shepherd theme overrides
    shepherdTextBackground: '#3d2f53',
    shepherdThemePrimary: '#624b86',
    shepherdThemeSecondary: '#c8c7d5'
  }
}

const resetDefaults = (tour) => tour.setProperties(tourDefaults)


export default class ProductTourService extends Service {
  @service tour

  _loadedTourName = null

  constructor() {
    super(...arguments)
    resetDefaults(this.tour)
  }


  async prepareCourseDashboardTour() {
    const keyName = 'dashboard-tour'
    const tour = this.tour
    resetDefaults(tour)
    await tour.addSteps(courseDashboardsSteps)
    this.set('_loadedTourName', keyName)
  }

  async preparePlayerTour() {
    const keyName = 'player-tour'
    const tour = this.tour
    resetDefaults(tour) 
    tour.set("modal", false)
    await tour.addSteps(contentPlayerSteps)
    this.set('_loadedTourName', keyName)
  }

  start(force) {
    if (localStorage.getItem(this._loadedTourName) && !force) {
      return;
    }
    const tour = this.tour
    localStorage.setItem(this._loadedTourName, true)
    tour.isActive ? tour.cancel() : tour.start()
  }
}