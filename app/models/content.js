import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  contentable: DS.attr(),
  course: DS.belongsTo('course'),
  //quiz: DS.belongsTo('quiz'),
  lecture: DS.belongsTo('lecture'),
  //"code-challenge": DS.belongsTo('code-challenge'),
  //document: DS.belongsTo('document'),
  //attachment: DS.belongsTo('attachment'),
  //video: DS.belongsTo('video'),
  payload: Ember.computed('contentable', 'quiz', 'lecture', 'code-challenge', 'document', 'video', function () {
    return this.get(this.get('contentable'))
  }),
  isDone: Ember.computed('progress', function () {
    const progress = this.get('progress')
    return progress && progress.get('status') === 'DONE'
  }),
  progress: DS.belongsTo('progress')
})