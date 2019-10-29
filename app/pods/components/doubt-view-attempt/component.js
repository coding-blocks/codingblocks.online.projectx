import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';

export default class DoubtViewAttemptComponent extends Component {
  @service api;
  @service store;
  @service currentContent;
  @service router;
  @service currentUser;
  @service talkjs;

  collapseThreads = true;

  @filterBy('doubt.comments', 'isNew', false) existingComments;

  @computed('doubt.{status,feedbacks.@each.ratedById')
  get feedbackMode() {
    const doubt = this.doubt;
    const userId = this.currentUser.user.id;

    const feedback = doubt.feedbacks ? doubt.feedbacks.find(f => f.ratedById == userId) : null;
    if (!feedback && doubt.status == 'RESOLVED') return true;
    else return false;
  }

  @restartableTask commentTask = function*() {
    if (this.get('commentBody.length') < 20) {
      return this.set('err', 'Comment length must be atleast 20 characters.');
    }
    this.set('err', '');

    const doubt = this.get('doubt');
    let comment = this.get('store').createRecord('comment', {
      body: this.get('commentBody'),
      discourseTopicId: doubt.get('discourseTopicId'),
    });
    comment.set('doubt', this.get('doubt')); //aisa isliye kiya hai kyoki https://github.com/emberjs/ember.js/issues/16258
    yield comment
      .save()
      .then(() => {
        this.set('commentBody', '');
      })
      .catch(err => {
        comment.rollbackAttributes();
        return this.set('err', err.errors[0].detail);
      });
  };

  @action
  comment() {
    this.get('commentTask').perform();
  }

  @action
  markStatus(status) {
    this.set('doubt.status', status);
    if (status == 'RESOLVED') this.set('doubt.resolvedById', this.get('currentUser.user.id'));
    else if (status == 'PENDING') this.doubt.set('feedbacks', []);

    this.get('doubt').save();
  }

  @action
  toggleThreadsCollapse() {
    this.toggleProperty('collapseThreads');
  }

  @action
  goToContent() {
    const contentId = this.get('doubt.content.id');

    const transition = this.get('router').transitionTo('attempt.content', contentId);

    if (transition.isActive) {
      // if we are already at this route, force refresh it
      getOwner(this)
        .lookup(`route:attempt.content`)
        .refresh();
    }
  }

  @action
  async startChat() {
    const { conversationId } = await this.api.request('/chats/' + this.doubt.id, {
      method: 'POST',
    });
    this.talkjs.startChat(conversationId);
  }
}
