import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed'

export default class IndexController extends Controller {
  @service currentUser
  @alias('currentUser.user') user
}
