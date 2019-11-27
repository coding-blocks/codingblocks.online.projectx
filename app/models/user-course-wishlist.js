import Model from '@ember-data/model';
import DS from 'ember-data'

export default Model.extend({
  course: DS.belongsTo('course'),
  user: DS.belongsTo('user')
});
