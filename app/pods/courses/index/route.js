import Route from '@ember/routing/route';
import { service } from 'ember-decorators/service'

export default class CoursesRouter extends Route {
  @service currentUser
  
  queryParams = {
    org: {
      replace: true
    }
  }

  constructor() {
    super()
    this.headData = Ember.inject.service()
  }

  model(params) {
    const organization = this.get('currentUser.organization') || params.org
    const extraWhere = {}

    if (organization) {
      extraWhere.organization = organization
    }

    return this.store.query('course', {
      include: 'runs',
      sort: 'difficulty',
      exclude: "ratings",
      filter: {
        unlisted: false,
        ...extraWhere
      },
      page: {
        limit: params.limit,
        offset: params.offset
      }
    })
  }

  setupController(controller, model) {
    controller.set('courses', model.toArray())
    controller.set("nextOffset", model.get('meta').pagination.nextOffset)
    controller.set("count", model.get('meta').pagination.count)

  }
  afterModel(model) {
    this.set('headData.title', 'Coding Blocks Online | All Courses')
  }
}
