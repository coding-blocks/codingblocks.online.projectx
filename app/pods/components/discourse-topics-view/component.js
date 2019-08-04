import Component from '@ember/component';

import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import env from 'codingblocks-online/config/environment';

export default class DiscourseTopicsView extends Component {
  @service api

  loading = false

  didReceiveAttrs () {
    this._super(...arguments)
    this.get('fetchTopicTasks').perform().then(response => {
      this.set('topic_list', response.topic_list)
    })
  }

  @computed('course.{catgoryId,doubtSubCategoryId}')
  get redirectLink () {
    const categoryId = this.get('course.categoryId')
    const subCategoryId = this.get('course.doubtSubCategoryId')

    return `${env.discussBaseUrl}/c/${categoryId}/${subCategoryId}`
  }

  @restartableTask fetchTopicTasks = function* ()  {
    this.set('loading', true)
    const courseId = this.get('course.id')
    const doubts = yield this.get('api').request(`/courses/${courseId}/doubts`, {
      data: {
        order: this.get('order') // "latest" or "top"
      }
    })
    this.set('loading', false)
    return doubts
  }
}
