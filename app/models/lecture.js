import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  video_url: DS.attr(),
  status: DS.attr(),
  content: DS.belongsTo('content')
})