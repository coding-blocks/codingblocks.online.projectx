import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  contentable: DS.attr(),
  course: DS.belongsTo('course'),
  //quiz: DS.belongsTo('quiz'),
  lecture: DS.belongsTo('lecture'),
  "code-challenge": DS.belongsTo('code-challenge'),
  document: DS.belongsTo('document'),
  //attachment: DS.belongsTo('attachment'),
  video: DS.belongsTo('video'),
  payload: Ember.computed('contentable', 'quiz', 'lecture', 'code-challenge', 'document', 'video', function () {
    return this.get(this.get('contentable'))
  }),
  isDone: Ember.computed('progress.isDone', function () {
    return !! this.get('progress.isDone')
  }),
  iconClass: Ember.computed('contentable', function () {
    switch (this.get('contentable')) {
      case 'document': return 'file-icon'; break;
      case 'code-challenge': return 'code-icon'; break;
      case 'lecture':
      default: return 'play-icon'; break;
    }
  }),
  progress: DS.belongsTo('progress'),
  section: DS.belongsTo('section')
})