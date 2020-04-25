import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class AttemptController extends Controller {
  @service currentUser

  @alias('currentUser.user') user

  @computed('user.{verifiedemail,verifiedmobile}')
  get isMobileOrEmailVerified() {
    const { verifiedemail, verifiedmobile } = this.user
    return verifiedemail || verifiedmobile
  }

  @computed('user.{firstname,lastname}')
  get hasEmptyName() {
    const { firstname, lastname } = this.user
    return !(firstname || lastname)
  }
}
