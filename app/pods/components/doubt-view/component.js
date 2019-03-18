import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember-decorators/service';
import { computed } from '@ember-decorators/object';
import env from 'codingblocks-online/config/environment';

export default class DoubtViewComponent extends Component {
  @service api

  didReceiveAttrs () {
    this._super(...arguments)
    this.get('fetchTopicTask').perform()
  }

  @computed('topic.avatar_template')
  get photoUrl() {
    const avatar_template = this.get('topic.avatar_template')
    if (!avatar_template)
      return ''

    return env.discussBaseUrl + '/' + avatar_template.replace('{size}', '150')
  }

  @computed('topicResponse.id')
  get redirectLink () {
    return env.discussBaseUrl + '/t/' + this.get('topicResponse.id')
  }

  @restartableTask
  *fetchTopicTask () {
    const topicResponse = yield this.get('api').request(`/courses/doubts/${this.get('topicId')}`)
    this.set('topic', topicResponse.post_stream.posts[0])
    this.set('topicResponse', topicResponse)
  }
}
