import DS from 'ember-data'

export default DS.Model.extend({
  value: DS.attr(),
  review: DS.attr(),
  heading: DS.attr(),
  updatedAt: DS.attr(),
  user: DS.attr()
})