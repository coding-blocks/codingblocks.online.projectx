import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { action, computed } from '@ember/object'

export default class MyCoursesTaskComponent extends Component {
  @service store;
  @service api;
  
  limit = 8
  offset = 0
  runs = []
  count = 0
  
  constructor () {
    super(...arguments)
    this.infiniteScroll = () => {
      if (document.getElementById('load-more') != null) {
        if (window.pageYOffset >= (document.getElementById('load-more').offsetTop - window.innerHeight)) {
          this.loadMore();
        }
      }
    }
    this.get('fetchMyCoursesTask').perform()
  }
  
  didInsertElement () {
    window.addEventListener('scroll', this.infiniteScroll);
  }
  
  willDestroyElement () {
    window.removeEventListener('scroll', this.infiniteScroll);
  }
  
  /**
  * Limit and offset sum computed property
  */
  
  @computed ("limit", "offset")
  get limitandoffset () {
    return (this.get('limit') + this.get('offset'));
  }
  
  /**
  * Fetch courses on the 'My Courses' page
  */
  
  @restartableTask
  *fetchMyCoursesTask () {
    const results = yield this.get("store").query("run", {
      include: "course,run_attempts",
      enrolled: true,
      page: {
        limit: this.limit,
        offset: this.offset
      }
    });
    this.set('count', results.meta.pagination.count);
    this.runs.addObjects(results);
  }
  
  /**
  * 'Load More' Button Action Handler for 'My Courses'
  */

  @action
  loadMore () {
    this.set('offset', this.offset + 8);
    this.fetchMyCoursesTask.perform();
  }
}
