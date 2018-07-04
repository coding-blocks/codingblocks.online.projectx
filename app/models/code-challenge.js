import DS from 'ember-data';
import env from 'codingblocks-online/config/environment'
import { computed } from '@ember/object';

export default DS.Model.extend({
    name: DS.attr(),
    hbContestId: DS.attr(),
    hbProblemId: DS.attr(),
    hbUrl: computed ('hbContestId', 'hbProblemId', function () {
    const hbContestId = this.get('hbContestId'),
        hbProblemId = this.get('hbProblemId')

    return `${env.hbBaseUrl}/contests/c/${hbContestId}/${hbProblemId}`
    })
})
