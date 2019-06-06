import { computed } from '@ember/object';
import DS from 'ember-data';
import env from 'codingblocks-online/config/environment'

export default DS.Model.extend({
  questions: DS.belongsTo('user'),
  choice: DS.belongsTo('choice')
})
