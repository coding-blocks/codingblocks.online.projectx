import Route from '@ember/routing/route'
import { action } from '@ember-decorators/object'
import DS from 'ember-data'

export default class FeedbackDoubtRoute extends Route {
  model({ doubt_id }) {
    return this.store.findRecord('doubt', doubt_id)
  }

  @action
  error(error) {
    if (error instanceof DS.ForbiddenError) {
      this.transitionTo('/404')
    }
  }
}
