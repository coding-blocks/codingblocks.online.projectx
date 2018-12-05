import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { service } from 'ember-decorators/service';
import { computed } from 'ember-decorators/object';
import env from 'codingblocks-online/config/environment';
import { action } from 'ember-decorators/object'
import comment from '../../../models/comment';

export default class DoubtViewAttemptComponent extends Component{
  @service api
  @service store
  @service currentContent

  collapseThreads = true;

  @action
  comment(){
    const doubt = this.get('doubt');
    let comment = this.get('store').createRecord('comment', 
    {
      body: this.get('commentBody'),
      discourseTopicId: doubt.get('discourseTopicId'),
      doubt: doubt
    })
    comment.save().then(result=>{
      this.set('commentBody', '');
    })
  }

  @action
  markResolved(){
    this.set('doubt.status', 'RESOLVED')
    this.get('doubt').save();
  }

  @action
  toggleThreadsCollapse(){
    this.toggleProperty('collapseThreads')
  }
};
