import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr(),
  username: DS.attr(),
  updatedAt: DS.attr(),
  doubt: DS.belongsTo('doubt'),
  discourseTopicId: DS.attr(),
});
