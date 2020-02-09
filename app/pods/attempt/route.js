import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'codingblocks-online/mixins/authenticated-route-mixin';
import { scheduleOnce } from "@ember/runloop";

export default Route.extend(AuthenticatedRouteMixin, {
	api: service(),
  router: service(),
  productTour: service(),
  async beforeModel() {
    const startTour = await this.productTour.preparePlayerTour()
    scheduleOnce('afterRender', startTour)
  },
	model(params, transition) {
		return this.store.findRecord('runAttempt', params.runAttemptId, { reload: true })
			.catch(err => {
				if (err instanceof DS.AdapterError) {
					// let's try correcting the runAttemptId

					//stop the current transition
					transition.abort()

					//get a corrected RunAttempt
					return this.api.request('/users/correctRunAttempt/'+ params.runAttemptId)
						.then(result => {
							// replace url param with corrected runAttemptId
							const url = this.get('router.currentURL').replace(/player\/\d*\//g, "player/" + result.id + '/')
							return this.transitionTo(url)
						})
						.catch(e => {
							console.error(e)
							this.transitionTo('404')
						})
				} else {
					throw err
				}		
			});
	},
	setupController(controller, model) {
		controller.set('runAttempt', model)
		controller.set("run", model.get('run'))
		controller.set("course", model.get('run.course'))
		controller.set("sections", model.get("run.sections"))
	},
	actions: {
    willTransition() {
			window.setTimeout( () => jivo_init(), 5000)
		},
    didTransition() {
			try {
				jivo_init();
			} catch (err) {
				console.log(err)
			}
		}
	}
});
