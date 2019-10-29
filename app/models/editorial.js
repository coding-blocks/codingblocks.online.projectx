import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr(),
  'code-challenge': DS.belongsTo('code-challenge'),
});
