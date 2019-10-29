import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr(),
  title: computed('content', function() {
    return this.get('content');
  }),
  cricketCupQuestion: DS.belongsTo('cricketCupQuestion'),
});
