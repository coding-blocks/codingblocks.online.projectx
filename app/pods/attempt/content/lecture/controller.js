import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';

export default class LectureController extends Controller {
  @service api
  @service player

  queryParams = ['start']

  @restartableTask fetchAwsData = function *() {
    return yield this.api.request('/aws/cookie', {
      data: {
          url: this.get('lecture.videoUrl')
      }
    })
  }
}
