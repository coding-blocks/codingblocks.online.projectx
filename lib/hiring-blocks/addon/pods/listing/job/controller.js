import Controller from '@ember/controller';
import { alias }  from '@ember-decorators/object/computed';
import { inject as service } from '@ember-decorators/service';
import { computed } from '@ember-decorators/object';
import { restartableTask } from 'ember-concurrency-decorators'
import { action } from '@ember-decorators/object';

export default class ListingJobController extends Controller {
  @alias('job.company') company
  @service store

  showDescription = false

  @computed('job.myApplication')
  get alreadyApplied() {
    return this.get('job.myApplication')
  }

  @restartableTask
  *applyForJob () {
    console.log("here")
    yield this.store.createRecord('application', {
      job: this.job
    }).save()

  }

  @action
  toggleShowDescription (){
    this.toggleProperty('showDescription')
  }

}
