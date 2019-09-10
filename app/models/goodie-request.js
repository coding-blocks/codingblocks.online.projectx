import DS from 'ember-data';
import run from './run';

export default DS.Model.extend({
    statusInProgress: DS.attr(),
    formInfo: DS.attr(),
    runAttempt: DS.belongsTo('run-attempt'),
    run: DS.belongsTo('run')
})