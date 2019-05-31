import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class PercentComplete extends Component {
  @service api
  percent = 0
  classNames = ['w-100', 'd-flex', 'align-items-center', 'justify-content-between']

  @restartableTask fetchPercentTask = function* ()  {
    const response = yield this.get('api').request(`run_attempts/${this.get('runAttemptId')}/progress`)
    this.set('percent', response.percent)
  }

  didReceiveAttrs(){
    this._super(...arguments);
    this.get('fetchPercentTask').perform()
    if(!this.get('showBar')){
      this.set('tagName', 'span')
    }
  }
  
}
