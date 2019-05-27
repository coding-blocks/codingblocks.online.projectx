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
  *applyForJob (extra) {
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
