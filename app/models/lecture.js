import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  videoUrl: DS.attr(),
  status: DS.attr(),
  content: DS.belongsTo('content'),
  duration: DS.attr(),
  videoId: DS.attr()
})
