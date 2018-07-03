import Route from '@ember/routing/route';

export default Route.extend({
    title: 'All Courses | CodingblocksOnline', 
    model () {
        return this.store.query ('course', {
          include: 'instructors,runs',
          sort: 'difficulty'
        })
    },
    setupController (controller, model) {
        controller.set ("courses", model)
    }
});
