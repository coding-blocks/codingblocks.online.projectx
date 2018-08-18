import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default class TimelineController extends Controller {
    @service api

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
