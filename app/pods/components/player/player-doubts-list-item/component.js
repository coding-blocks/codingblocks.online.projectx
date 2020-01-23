import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';

export default class DoubtListItem extends Component {
  @service currentUser
  @service api
  @service store
  @service talkjs

  @restartableTask commentTask = function* ()  {
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
      return this.set('err', err.errors[0].detail);
    })
  }
  
  @action
  async markStatus (status) {
    this.set('doubt.status', status)
    if (status == 'RESOLVED')
      this.set('doubt.resolvedById', this.get('currentUser.user.id'))
    else if (status == 'PENDING')
      this.doubt.set('feedbacks', [])
    await this.get('doubt').save()
    if (this.get('doubt.status') === 'RESOLVED') {
      this.set('showFeedbackModal', true)
    }
  }

  @action
  async startChat () {
    const { conversationId } = await this.api.request('/chats/' + this.doubt.id, {method: 'POST'}) 
    this.talkjs.startChat(conversationId)
  }
}
