import DS from 'ember-data';
import { computed }  from '@ember/object';

export default DS.Model.extend({
  name: DS.attr(),
  username: DS.attr(),
  firstname: DS.attr(),
  lastname: DS.attr(),
  email: DS.attr(),
  organization: DS.attr(),
  hackJwt: DS.attr(),
  lastReadNotification: DS.attr (),
  photo: DS.attr(),
  oneauthId: DS.attr(),
  verifiedemail: DS.attr(),
  verifiedmobile: DS.attr(),
  fullname: computed('firstname', 'lastname', function () {
    return [this.firstname.capitalize(), this.lastname.capitalize()].join(' ')
  })
});
