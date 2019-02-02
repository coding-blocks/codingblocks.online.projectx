import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  description: DS.attr(),
  datasetUrl: DS.attr(),
  testcasesUrl: DS.attr(),
  csvSubmissions: DS.hasMany('csv-submission')
})