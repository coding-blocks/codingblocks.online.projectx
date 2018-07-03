import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Doubts ',
  model () {
    return this.modelFor("classroom.timeline").get("run.course");
  }
});
