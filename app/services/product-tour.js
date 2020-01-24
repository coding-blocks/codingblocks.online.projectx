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

const noop = () => { }

const tourStarterHoc = (tour, keyName) => {
  return () => {
    localStorage.setItem(keyName, true)
    tour.start()
  }
}

export default class ProductTourService extends Service {
  @service tour

  constructor() {
    super(...arguments)
    const tour = this.tour

    tour.setProperties({
      defaultStepOptions,
      disableScroll: true,
      modal: true,
      styleVariables: {
        // Shepherd theme overrides
        shepherdTextBackground: '#3d2f53',
        shepherdThemePrimary: '#624b86',
        shepherdThemeSecondary: '#c8c7d5'
      },
      confirmCancel: true
    })
  }

  async prepareCourseDashboardTour() {
    const keyName = 'dashboard-tour'
    if (localStorage.getItem(keyName)) {
      return noop
    }
    const tour = this.tour
    await tour.addSteps(courseDashboardsSteps)
    return tourStarterHoc(tour, keyName)
  }

  async preparePlayerTour() {
    const keyName = 'player-tour'
    if (window.localStorage.getItem(keyName)) {
      return noop
    }
    const tour = this.tour
    await tour.addSteps(contentPlayerSteps)
    return tourStarterHoc(tour, keyName)
  }
}