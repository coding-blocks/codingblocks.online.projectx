import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  score: DS.attr(),
  correctChoiceId: DS.attr(),
  cricketCupChoices: DS.hasMany('cricketCupChoice'),
  cricketCupMatch: DS.belongsTo('cricketCupMatch')
})
