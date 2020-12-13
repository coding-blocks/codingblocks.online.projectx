import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  body: DS.attr(),
  status: DS.attr(),
  content: DS.belongsTo('content'),
  runAttempt: DS.belongsTo('run-attempt'),
  category: DS.attr(),
  discourseTopicId: DS.attr(),
  firebaseRef: DS.attr(),
  comments: DS.hasMany('comment'),
  feedbacks: DS.hasMany('doubt-feedback'),
  resolvedById: DS.attr(),
  createdAt: DS.attr('date'),
  file_link: DS.attr()
})