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
    if (progress.status == 'DONE') // don't mark progress if already done
      return;
    
    progress.set('status', 'DONE')
    this.runAttempt.incrementProperty("completedContents")
    progress.save()
  }
}
