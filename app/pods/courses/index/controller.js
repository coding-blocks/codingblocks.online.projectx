import Controller from '@ember/controller';

export default class CoursesController extends Controller {
  queryParams = {
    org: {
      replace: true
    }
  }
}