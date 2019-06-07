import { computed } from '@ember/object';
import DS from 'ember-data';
import env from 'codingblocks-online/config/environment'

export default DS.Model.extend({
  content: DS.attr(),
  title: computed('content', function () {
    return this.get('content')
  }),
  cricketCupQuestion: DS.belongsTo('cricketCupQuestion')
})
