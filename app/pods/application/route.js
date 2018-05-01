import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';

export default Route.extend(ApplicationRouteMixin, {
    session: service(),
    currentUser: service(),
    queryParams: {
        code: {
            refreshModel: true
        }
    },
    beforeModel (transition) {
        if( !isNone(transition.queryParams.code) ) {
            if (this.get('session.isAuthenticated')) {
                return this.transitionTo({queryParams: {code: undefined}})
            }            
            // we have ?code qp
            const { code } = transition.queryParams
            return this.get('session').authenticate('authenticator:jwt', {identification: code, password: code, code})
              .catch(error => {
              if(error.err === 'USER_EMAIL_NOT_VERIFIED') {
                this.transitionTo('error', {
                  queryParams: {
                    errorCode: 'USER_EMAIL_NOT_VERIFIED'
                  }
                })
              }
            })
        }
    },
    model () {
        if (this.get('session.isAuthenticated')) {
            return this.get('currentUser').load()
        } 
    }
})
