import { computed } from '@ember/object';
import DS from 'ember-data';
import env from 'codingblocks-online/config/environment'

export default DS.Model.extend({
  title: DS.attr(),
  start: DS.attr(),
  description: DS.attr(),
  team1name: DS.attr(),
  team1logo: DS.attr(),
  team2name: DS.attr(),
  team2logo: DS.attr(),
  questions: DS.hasMany('cricketCupMatchQuestion')
})
