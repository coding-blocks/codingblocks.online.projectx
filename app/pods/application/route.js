import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import { later } from '@ember/runloop';

export default Route.extend(ApplicationRouteMixin, {
    session: service(),
    currentUser: service(),
    store: service (),
    headData: service(),
    queryParams: {
        code: {
            refreshModel: true
        }
    },
    beforeModel (transition) {
      if (!isNone(transition.to.queryParams.code)) {
        if (this.get('session.isAuthenticated')) {
          return this.transitionTo({ queryParams: { code: undefined } })
        }
        // we have ?code qp
        const { code } = transition.to.queryParams
        
        return this.session.authenticate('authenticator:jwt', { identification: code, password: code, code })
          .then(() => this.currentUser.load())
          .then(user => {
            // if user belongs to an org, redirect to the domain
            if(user.get('organization')) {
              this.transitionTo(user.get('organization'))
            }
          })
          .catch(error => {
            if (error.err === 'USER_EMAIL_NOT_VERIFIED') {
              this.transitionTo('error', {
                queryParams: {
                  errorCode: 'USER_EMAIL_NOT_VERIFIED'
                }
              })
            }
          });
      }
    },
    model () {
        if (this.get('session.isAuthenticated')) {
          return this.currentUser.load().then (user => {
            try {
              OneSignal.getUserId ().then (userId => {
                if (! userId) {
                  throw new Error ('player ID not found')
                }

                const player = this.store.createRecord ('player')

                player.set ('playerId', userId)

                return player.save ()
              })
                .then (result => console.log ('playerId set!'))
                .catch (error => console.error (error))
            }
            catch (error) {
              console.error(error)
            }
            return user
          });
        }
    },

    setupController(controller, model){
      this._super(controller, model)
      controller.set('model', model)

      later(function(){
        controller.set('code', undefined)
      })
    },
    afterModel(model) {
      this.set('headData.title', 'Coding Blocks Online')
    }
})
