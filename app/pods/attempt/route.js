import Ember from 'ember'
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import { isBadRequestError } from 'ember-ajax/errors';
import $ from 'jquery';

export default Route.extend({
	api: service(),
	runAttemptService: service('run-attempt'),
	model(params, transition) {
		this.runAttemptService.setRunAttempt(params.runAttemptId)
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
							const url = transition.intent.url.replace(/player\/\d*\//g, "player/" + result.id + '/')
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
		this._super(...arguments)
		// console.log("inside setupController for attempt")
		// controller.set("sectionId", this.paramsFor('attempt.content').sectionId)
		controller.set("run", model.get('run'))
		controller.set("course", model.get('run.course'))
		controller.set("sections", model.get("run.sections"))
	},
	actions: {
		willTransition () {
			window.setTimeout( () => jivo_init(), 5000)
		},
		didTransition () {
			jivo_init();
		}
	}
});
