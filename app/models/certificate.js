import DS from "ember-data";

export default DS.Model.extend({
  url: DS.attr(),
  status: DS.attr(),
  salt: DS.attr()
})