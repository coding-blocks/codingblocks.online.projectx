import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr(),
  description: DS.attr(),
  logo: DS.attr(),
  website: DS.attr(),
  jobs: DS.hasMany('jobs')

})