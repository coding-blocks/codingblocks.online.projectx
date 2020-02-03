import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LectureController extends Controller {
  @service api
  @service player

  queryParams = ['start']

  @action
  async markProgress() {
    const progress = await this.content.get('progress')
    progress.set('status', 'DONE')
    progress.save()
  }
}
