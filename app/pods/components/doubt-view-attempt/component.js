import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { service } from 'ember-decorators/service';
import env from 'codingblocks-online/config/environment';
import { action } from 'ember-decorators/object'
import { filterBy } from '@ember/object/computed';
import Router from '../../../router';

export default class DoubtViewAttemptComponent extends Component{
  @service api
  @service store
  @service currentContent
  @service router

  collapseThreads = true;

  existingComments = filterBy('comments', 'isNew', false)

  commentTask = task(function * (){
    if (this.get('commentBody.length') < 20) {
      return this.set('err', 'Comment length must be atleast 20 characters.')
    }
    this.set('err', '');

    const doubt = this.get('doubt');
    let comment = this.get('store').createRecord('comment',
      {
        body: this.get('commentBody'),
        discourseTopicId: doubt.get('discourseTopicId'),
      })
    comment.set('doubt', this.get('doubt'))//aisa isliye kiya hai kyoki https://github.com/emberjs/ember.js/issues/16258
    yield comment.save().then(result => {
      this.set('commentBody', '');
    }).catch(err => {
      comment.rollbackAttributes();
      return this.set('err', err.errors[0].detail[0]);
    })
  })

  @action
  comment(){
    this.get('commentTask').perform();
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

  @action 
  goToContent(){
    console.log('going');
    const contentId = this.get('doubt.content.id')

    const transition = this.get('router').transitionTo('attempt.content', contentId)

    if (transition.isActive) {
      // if we are already at this route, force refresh it 
      Ember.getOwner(this).lookup(`route:attempt.content`).refresh()
    }
  }
}
