import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object'
import { filterBy, lt, or, not, filter } from '@ember/object/computed';
import { computed } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';

export default class DoubtsViewComponent extends Component {
  @service store 
  @service currentContent
  @service firepad

  classNames=['c-doubts']

  activeTab = 'PENDING'
  err = ''
  
  @filterBy('doubts', 'isNew', false)
  existingDoubts

  @not('runAttempt.premium') freeTrial
  @lt('runAttempt.doubtSupport', new Date()) doubtSupportExpired
  @or('doubtSupportExpired', 'askDoubtTask.isRunning', 'freeTrial') disableAskDoubts

  @filterBy('existingDoubts', 'status', 'RESOLVED')
  resolved

  @filter('existingDoubts', doubt => doubt.status != 'RESOLVED')
  unresolved 

  @computed('existingDoubts', 'currentContent')
  get duplicatePendingDoubt () {
    const contentId = this.currentContent.getContentId()
    return this.existingDoubts.find(d => d.get('content.id') == contentId && d.status == 'PENDING')
  }

  @restartableTask askDoubtTask = function* () {
    if (this.get('title.length') < 15) {
      return this.set('err', 'Title length must be atleast 15 characters.')
    }
    if (this.get('body.length') < 20) {
      return this.set('err', 'Description length must be atleast 20 characters.')
    }
    if (this.doubtSupportExpired) {
      return this.set('err', 'Your doubt support period has ended.')
    }
    if (this.freeTrial) {
      return this.set('err', 'Doubt Support is not available for Free Trials.')
    }
    if (this.duplicatePendingDoubt) {
      return this.set('err', 'You already have a pending doubt for this content. Please edit that to add more info.')
    }

    this.set('err', '')

    const contentId = this.get('currentContent').getContentId()
    const content = this.get('store').peekRecord('content', contentId);

    const doubt = this.get('store').createRecord('doubt', {
      title: this.get('title'),
      body: this.get('body'),
      category: this.get('runAttempt.run.course.categoryId'),
      content,
      status: "PENDING"
    })
    doubt.set("runAttempt", this.get('runAttempt'))//aisa isliye kiya hai kyoki https://github.com/emberjs/ember.js/issues/16258
    try {
      yield doubt.save()
      this.set('title', '')
      this.set('body', '')

      this.firepad.set('ref', doubt.firebaseRef)
      this.firepad.connect()
      
    } catch (err) {
      doubt.rollbackAttributes();
      this.set('err', err.errors[0].detail)
    }
  }

  @action
    setActiveTab(tab){
      this.set('activeTab', tab);
    }
};