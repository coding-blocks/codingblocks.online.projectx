import Controller from '@ember/controller';
import { inject as service } from '@ember/service'

export default Controller.extend({
  currentUser: service(),
  actions: {
    goToRecommendedCourses () {
      window.scrollTo({
        top: document.getElementById('recommended-courses').offsetTop - 70,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
});
