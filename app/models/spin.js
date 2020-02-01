import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  valid_till: DS.attr(),
  used: DS.attr(),
  used_at: DS.attr('date'),
  won: DS.attr(),
  prize_remarks_extra: DS.attr(),
  user: DS.belongsTo('user'),
  spinPrize: DS.belongsTo('spin_prize')
});
