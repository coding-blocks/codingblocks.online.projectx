import Route from '@ember/routing/route';

export default Route.extend({
  headData: Ember.inject.service(),
  beforeModel () {
      window.scrollTo(0,0);
    },
    model (params) {
        return this.store.findRecord("course", params.courseId)
    },
    setupController(controller, model) {
        this._super(...arguments)
        controller.set("course", model)
    },
    afterModel(model) {
      this.set('headData.title', model.get('title'))
    },
    actions: {
      didTransition () {
        $(function () {
          $('body > jdiv')[0].style.setProperty('display', 'block', 'important')
          $('#jivo-iframe-container')[0].style.setProperty('display', 'block', 'important')
        })
        return true
      }
    }
 });
