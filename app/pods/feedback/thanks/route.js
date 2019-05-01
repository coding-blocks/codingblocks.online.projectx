import Route from '@ember/routing/route';
import { later }  from '@ember/runloop';

export default class FeedbackThanksRoute extends Route {
  model () {
    later(() => {
      this.transitionTo('classroom')
    }, 5000)
  }
}
