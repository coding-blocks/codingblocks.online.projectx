import Controller from '@ember/controller';
import { alias }  from '@ember-decorators/object/computed';
import { inject as service } from '@ember-decorators/service';
import { restartableTask } from 'ember-concurrency-decorators'

export default class ListingJobController extends Controller {
  @alias('job.company') company
  @service store

  @restartableTask
  *applyForJob () {
    console.log("here")
    yield this.store.createRecord('application', {
      job: this.job
    }).save()

  }

}
