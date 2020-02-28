import Model from '@ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  webinar_id: DS.attr(),
  name: DS.attr(),
  description: DS.attr(),
  start_time: DS.attr('date'),
  duration: DS.attr('number'),
  start_url: DS.attr(),
  join_url: DS.attr(),
  content: DS.belongsTo('content'),
  contentId: DS.attr()
});
