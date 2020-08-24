import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ChitkaraIndexController extends Controller {
  @action
  goToRecommendedCourses () {
    window.scrollTo({
      top: document.getElementById('recommended-courses').offsetTop - 70,
      left: 0,
      behavior: 'smooth'
    })
  }
}
