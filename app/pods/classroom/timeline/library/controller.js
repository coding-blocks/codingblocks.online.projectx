import Controller from '@ember/controller';
import { action } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators'
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class ClassroomTimelineLibraryController extends Controller {
  @service store

  limit = 5
  offset = 0
  
  tabs = [
    {
      name: 'Notes',
      component: 'course-library/notes',
      task: this.fetchMyNotes
    },
    {
      name: 'Announcements',
      component: 'course-library/announcements',
      task: this.fetchAnnouncements
    },
    {
      name: 'Bookmarks',
      component: 'course-library/bookmarks',
      task: this.fetchBookmarks

    },
    {
      name: 'Doubts',
      component: 'player/player-doubts-list',
      task: this.fetchDoubts
    }
  ];

  activeTab = {
    name: 'Notes',
    component: 'course-library/notes',
    task: this.fetchMyNotes
  }

  @alias('activeTab.task.lastSuccessful.value.meta.pagination')
  pagination

  @computed('offset', 'limit')
  get paginationOptions() {
    return { offset: this.offset, limit: this.limit}
  }

  @restartableTask fetchMyNotes = function* () {
    return this.store.query('note', {
      include: 'content',
      exclude: 'content.*',
      filter: {
        runAttemptId: this.runAttempt.id
      },
      page: this.paginationOptions,
      sort: '-createdAt'
    })
  }

  @restartableTask fetchAnnouncements = function* () {
    return this.store.query('announcement', {
      include: 'user',
      filter: {
        runId: this.runAttempt.get('run.id'),
      },
      page: this.paginationOptions,
      sort: '-createdAt'
    })
  }

  @restartableTask fetchBookmarks = function* () {
    return this.store.query('bookmark', {
      include: 'section,content',
      exclude: 'section.*,content.*',
      filter: {
        runAttemptId: this.runAttempt.id
      },
      page: this.paginationOptions,
      sort: '-createdAt'
    })
  }

  @restartableTask fetchDoubts = function* () {
    const doubts = this.runAttempt.doubts
    return doubts
  }

  @action
  changeTab(tab) {
    this.setProperties({
      activeTab: tab,
      offset: 0,
    })
  }

  @action
  paginate(page) {
    this.set("offset", (page - 1) * this.limit);
    this.activeTab.task.perform()
  }

}