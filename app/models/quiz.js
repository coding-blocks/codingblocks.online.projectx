import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  descripiton: DS.attr(),
  duration: DS.attr(),
  maxAttempts: DS.attr()
})