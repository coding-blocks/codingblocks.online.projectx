import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  contentable: DS.attr(),
  course: DS.belongsTo('course'),
  qna: DS.belongsTo('qna'),
  lecture: DS.belongsTo('lecture'),
  "code-challenge": DS.belongsTo('code-challenge'),
  document: DS.belongsTo('document'),
  //attachment: DS.belongsTo('attachment'),
  video: DS.belongsTo('video'),
  payload: computed('contentable', 'qna', 'lecture', 'code-challenge', 'document', 'video', function () {
    return this.get(this.get('contentable'))
  }),
  isDone: computed('progress.isDone', function () {
    return !! this.get('progress.isDone')
  }),
  iconClass: computed('contentable', function () {
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
