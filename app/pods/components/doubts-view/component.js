import Component from '@ember/component';
import { service } from 'ember-decorators/service'
import { action } from 'ember-decorators/object'
import { computed } from 'ember-decorators/object';
import course from '../../../models/course';


export default class DoubtsViewComponent extends Component {
  @service store 
  @service currentContent

  classNames=['c-doubts']

  activeTab = 'PENDING'
  err = ''

  @computed ('doubts.@each.status')
  unresolved(){
    return this.get('doubts').reduce((acc, val)=>{
      return val.get('status') === 'PENDING' ? ++acc : acc;
    }, 0)
  }

  @action
    askDoubt(){
      const contentId = this.get('currentContent').getContentId()
      const content = this.get('store').peekRecord('content', contentId);

      const doubt = this.get('store').createRecord('doubt', {
        title: this.get('title'),
        body: this.get('body'),
        category: this.get('runAttempt.run.course.categoryId'),
        content,
        status: "PENDING",
        runAttempt: this.get('runAttempt')
      })
      doubt.save().then(r=>{
        this.get('doubts').pushObject(doubt);
        this.set('title', '')
        this.set('body', '')
        this.set('err', '')
      }).catch(err=>{
        this.set('err', 'Something went wrong!');
      })
    }

  @action
    setActiveTab(tab){
      this.set('activeTab', tab);
    }
};