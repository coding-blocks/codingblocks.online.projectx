import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  score: DS.attr(),
  correctChoiceId: DS.attr('string'),
  cricketCupChoices: DS.hasMany('cricketCupChoice'),
  cricketCupMatch: DS.belongsTo('cricketCupMatch'),
})
