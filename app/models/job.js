import DS from "ember-data";

export default DS.Model.extend({
  description: DS.attr(),
  location: DS.attr(),
  role: DS.attr(),
  title: DS.attr(),
  ctc: DS.attr(),
  status: DS.attr(),
  experience: DS.attr(),
  company: DS.attr()
})