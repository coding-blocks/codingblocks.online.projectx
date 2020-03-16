import { computed } from '@ember/object';
import DS from 'ember-data';
import env from 'codingblocks-online/config/environment'

export default DS.Model.extend({
    name: DS.attr(),
    hbContentId: DS.attr(),
    content: DS.belongsTo('content'),
    testcases: DS.hasMany('testcase')
})
