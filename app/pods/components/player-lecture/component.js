import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    api: inject(),
    classNames: ['height-100'],
    lecture: computed.alias('payload'),
    didReceiveAttrs () {
        this.get('awsDataTask').perform()
        this._super(...arguments)
    },

    awsDataTask: task(function *() {
        return yield this.get('api').request('/aws/cookie', {
            data: {
                url: this.get('lecture.videoUrl')
            }
        }).catch(err => err)
    }),
    actions: {
    }
})
