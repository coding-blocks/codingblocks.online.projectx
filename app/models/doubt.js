import DS from 'ember-data';
import { computed } from '@ember/object'

export default DS.Model.extend({
  title: DS.attr(),
  body: DS.attr(),
  status: DS.attr(),
  content: DS.belongsTo('content'),
  runAttempt: DS.belongsTo('run-attempt'),
  category: DS.attr(),
  discourseTopicId: DS.attr(),
  firebase_ref: DS.attr(),
  comments: DS.hasMany('comment'),
  resolvedById: DS.attr()
})