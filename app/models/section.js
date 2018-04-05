import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr(),
  premium: DS.attr(),
  doneContents: computed('contents.@each.isDone', function () {
    return this.get('contents').filter(content => content.get('isDone'))
  }),
  contents: DS.hasMany('content')
});