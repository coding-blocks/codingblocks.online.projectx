import Model from '@ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  language: DS.attr(),
  body: DS.attr()
});
