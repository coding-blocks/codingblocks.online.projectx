import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';

export default class CoursesRouter extends Route {
  queryParams = {
    org: {
      replace: true
    }
  }
}
