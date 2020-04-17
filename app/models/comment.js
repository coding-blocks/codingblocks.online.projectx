import DS from 'ember-data';
import { computed } from '@ember/object'

export default DS.Model.extend({
  body: DS.attr(),
  name: DS.attr(),
  avatarTemplate: DS.attr(),
  username: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('dare'),
  doubt: DS.belongsTo('doubt'),
  discourseTopicId: DS.attr()
})