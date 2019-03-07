import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    api: inject(),
    classNames: ['height-100'],
    lecture: alias('payload'),
    didReceiveAttrs () {
        this.awsDataTask.perform()
        this._super(...arguments)
    },

    awsDataTask: task(function *() {
        return yield this.api.request('/aws/cookie', {
            data: {
                url: this.get('lecture.videoUrl')
            }
        }).catch(err => err);
    }),
    actions: {
    }
})
