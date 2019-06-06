import { computed } from '@ember/object';
import DS from 'ember-data';
import env from 'codingblocks-online/config/environment'

export default DS.Model.extend({
  farzi: DS.attr(),
  cricketCupQuestion: DS.belongsTo('cricketCupQuestion'),
  cricketCupChoice: DS.belongsTo('cricketCupChoice'),
  cricketCupMatch: DS.belongsTo('cricketCupMatch')
})
