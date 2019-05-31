import Controller from '@ember/controller';
import { alias }  from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators'
import { action } from '@ember/object';

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

  @dropTask applyForJob = function *(extra) {
    yield this.store.createRecord('application', {
      job: this.job,
      resumeLink: this.resumeLink,
      extra 
    }).save()
    this.toggleShowModal()
  }

  @action
  toggleShowDescription (){
    this.toggleProperty('showDescription')
  }

  @action 
  toggleShowModal () {
    if (this.job.form.length) {
      this.toggleProperty('showModal')
    } else {
      this.applyForJob.perform()
    }
  }

}
