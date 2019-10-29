import DS from 'ember-data';

export default DS.Model.extend({
  farzi: DS.attr(),
  cricketCupQuestion: DS.belongsTo('cricketCupQuestion'),
  cricketCupChoice: DS.belongsTo('cricketCupChoice'),
  cricketCupMatch: DS.belongsTo('cricketCupMatch'),
});
