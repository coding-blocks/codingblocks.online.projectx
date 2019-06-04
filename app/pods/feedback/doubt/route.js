import Route from '@ember/routing/route'
import { action } from '@ember/object'
import { inject as service } from '@ember/service';
import DS from 'ember-data'

class ACLError extends Error {
  constructor () {
    super(...arguments)
    this.description = 'Internal ACL error'
  }
}

export default class FeedbackDoubtRoute extends Route {
  @service currentUser
  model({ doubt_id }) {
    return this.store.queryRecord('doubt', {
      custom: {
        ext: 'url',
        url: `${doubt_id}`
      },
      include: 'feedbacks'
    })
  }

  afterModel (model) {
    const userId = this.currentUser.user.id
    if (model.feedbacks && model.feedbacks.find(f => f.ratedById == userId)) {
      throw new ACLError('Already left Feedback')
    }
  }

  @action
  error(error) {
    if (error instanceof DS.ForbiddenError) {
      this.transitionTo('/404')
    } else if (error instanceof ACLError) {
      this.transitionTo('feedback.thanks')
    } else {
      throw error
    }
  }
}
