import Controller from '@ember/controller';
import { alias }  from '@ember-decorators/object/computed';
import { inject as service } from '@ember-decorators/service';
import { computed } from '@ember-decorators/object';
import { dropTask } from 'ember-concurrency-decorators'
import { action } from '@ember-decorators/object';

export default class ListingJobController extends Controller {
  @alias('job.company') company
  @service store

  showDescription = false
  showModal = false
  resumeLink = ''

  @computed('job.myApplication')
  get alreadyApplied() {
    return this.get('job.myApplication')
  }

  @dropTask
  *applyForJob () {
    yield this.store.createRecord('application', {
      job: this.job,
      resumeLink: this.resumeLink
    }).save()
    this.toggleShowModal()
  }

  @action
  toggleShowDescription (){
    this.toggleProperty('showDescription')
  }

  @action 
  toggleShowModal () {
    this.toggleProperty('showModal')
  }

}
