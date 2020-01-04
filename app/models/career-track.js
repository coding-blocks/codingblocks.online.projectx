import Ember from 'ember';
import Model from '@ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  name: DS.attr(),
  languages: DS.attr(),
  unlisted: DS.attr(),
  logo: DS.attr(),
  status: DS.attr(),
  background: DS.attr(),
  courses: DS.hasMany('course'),
  courseCount: Ember.computed('courses', function() {
    return this.hasMany('courses').ids().length
  })
});
