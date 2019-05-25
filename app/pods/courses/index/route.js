import Route from '@ember/routing/route';

export default class CoursesRouter extends Route {
  queryParams = {
    org: {
      replace: true
    }
  }
}
