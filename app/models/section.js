import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  premium: DS.attr(),
  contents: DS.hasMany('content')
});