import Component from '@ember/component';
import { task } from "ember-concurrency";
import { service } from "ember-decorators/service";
import { computed } from 'ember-decorators/object';
import env from 'codingblocks-online/config/environment';

export default class DiscourseTopicsView extends Component {
  @service api

  constructor () {
    super(...arguments)
    this.get('fetchTopicTasks').perform().then(response => {
      this.set('topic_list', response.topic_list)
    })
  }

  @computed('course.catgoryId', 'course.doubtSubCategoryId')
  get redirectLink () {
    const categoryId = this.get('course.categoryId')
    const subCategoryId = this.get('course.doubtSubCategoryId')

    return `${env.discussBaseUrl}/c/${categoryId}/${subCategoryId}`
  }

  fetchTopicTasks = task( function * () {
    const courseId = this.get('course.id')
    return yield this.get('api').request(`/courses/${courseId}/doubts`, {
      data: {
        order: this.get('order') // "latest" or "top"
      }
    })
  })
}