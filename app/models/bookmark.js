import DS from 'ember-data';

export default DS.Model.extend({
    content: DS.belongsTo('content'),
    section: DS.belongsTo('section'),
    runAttempt: DS.belongsTo('run-attempt')
});
