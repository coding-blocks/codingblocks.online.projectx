import { computed } from '@ember/object';
import DS from 'ember-data';
import env from 'codingblocks-online/config/environment'

export default DS.Model.extend({
  content: DS.attr(),
  question: DS.belongsTo('cricketCupQuestion')
})
