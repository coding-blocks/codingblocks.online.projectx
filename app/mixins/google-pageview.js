import { get } from '@ember/object';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import ENV from '../config/environment';

export default Mixin.create({
  session: service(),
  currentUser: service(),
  headData: service(),

  userPageviewToGA: on('didTransition', function() {
    let page = this.url;
    let title = this.get('headData.title');

    if (get(ENV, 'googleAnalytics.webPropertyId') != null) {
      if(this.get('session.isAuthenticated')){
        let userId = this.get('currentUser.user.oneauthId')
        window['ga']('set', 'userId', userId);
      } else {
      }
      window['ga']('send', 'pageview', {
        page: page,
        title: title
      });
    }
  })

});