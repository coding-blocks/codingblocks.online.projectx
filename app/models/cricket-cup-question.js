import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  start: DS.attr(),
  description: DS.attr(),
  score: DS.attr(),
  choices: DS.hasMany('cricketCupMatchChoices')
})
