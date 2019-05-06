import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'codingblocks-online/mixins/authenticated-route-mixin';

export default class FeedbackRoute extends Route.extend(AuthenticatedRouteMixin) {
}
