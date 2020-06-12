import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr(),
  video_url: DS.attr(),
  text: DS.attr(),
  createdAt: DS.attr(),
  updatedAt: DS.attr(),
  content: DS.belongsTo('content'),
  courseId: DS.attr('number')

})