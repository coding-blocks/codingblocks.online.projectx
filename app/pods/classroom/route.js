import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    authenticationRoute: 'index',
    title: function(tokens) {
    tokens = Ember.makeArray(tokens);
    return tokens.reverse().join(' - ') + ' | CodingBlocks Online';
  },
})