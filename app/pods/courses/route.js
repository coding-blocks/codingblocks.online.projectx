import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class CoursesRouter extends Route {
  @service currentUser
  activate(){
    if(!this.currentUser.organistaion){
      window.location.href='/courses'
    }
  }
}
