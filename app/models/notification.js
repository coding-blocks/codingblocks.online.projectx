import DS from 'ember-data';

export default DS.Model.extend ({
  title: DS.attr (),
  message: DS.attr (),
  url: DS.attr (),
  triggerID: DS.attr (),
  triggerType: DS.attr (),
  run: DS.belongsTo ('run'),
  course: DS.belongsTo ('course'),
  user: DS.belongsTo ('user')
});
