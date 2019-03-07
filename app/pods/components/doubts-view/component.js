import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object'
import { filterBy } from '@ember-decorators/object/computed';
import { computed } from '@ember-decorators/object';
import { restartableTask } from 'ember-concurrency-decorators';

export default class DoubtsViewComponent extends Component {
  @service store 
  @service currentContent

  classNames=['c-doubts']

  activeTab = 'PENDING'
  err = ''
  
  @filterBy('doubts', 'isNew', false)
  existingDoubts

  @computed('existingDoubts.@each.status')
  get unresolved() {
    return this.get('existingDoubts').reduce((acc, val) => {
      return val.get('status') === 'PENDING' ? ++acc : acc;
    }, 0)
  }

  @restartableTask
  *askDoubtTask (){
    if (this.get('title.length') < 15) {
      return this.set('err', 'Title length must be atleast 15 characters.')
    }
    if (this.get('body.length') < 20) {
      return this.set('err', 'Description length must be atleast 20 characters.')
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
    yield doubt.save()
    .then(r => {
      this.set('title', '')
      this.set('body', '')
    }).catch(err => {
      doubt.rollbackAttributes();
      this.set('err', err.errors[0].detail);
    })
  }

  @action
    askDoubt(){
      this.get('askDoubtTask').perform();
    }
  @action
    setActiveTab(tab){
      this.set('activeTab', tab);
    }
};