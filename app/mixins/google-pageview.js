import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Mixin.create({
  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  headData: Ember.inject.service(),

  userPageviewToGA: Ember.on('didTransition', function() {
    let page = this.get('url');
    let title = this.get('headData.title');

    if (Ember.get(ENV, 'googleAnalytics.webPropertyId') != null) {
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