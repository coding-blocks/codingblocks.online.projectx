import { computed } from '@ember/object';
import DS from 'ember-data';
import env from 'codingblocks-online/config/environment'

export default DS.Model.extend({
  question: DS.belongsTo('cricketCupQuestion'),
  choice: DS.belongsTo('choice'),
  match: DS.belongsTo('cricketCupMatch')
})
