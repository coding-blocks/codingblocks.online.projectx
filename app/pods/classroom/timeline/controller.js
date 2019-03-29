import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import { computed }  from '@ember-decorators/object';

export default class TimelineController extends Controller {
    queryParams = ['showFeedback']
    showFeedback = false

    @service api

    @computed ('run.topRunAttempt.{premium,isExpired}')
    get showBuyNow () {
        const ra = this.get('run.topRunAttempt')
        return !ra.premium || ra.isExpired
    }


    @action
    resetProgress () {
        this.get('api').request('progresses/reset', {
            method: 'POST',
            data: {
                runAttemptId:  this.get('runAttempt.id')
            }
        }).then( () => this.send('reloadRoute'))
    }
}
