import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  size: DS.attr(),
  rotation: DS.attr()
});
