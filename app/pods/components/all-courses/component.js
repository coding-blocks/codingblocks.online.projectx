import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias }  from '@ember/object/computed';
import { action, computed } from '@ember/object';

export default class AllCoursesComponent extends Component {
  
  @service store;
  @service api;

  limit = 8
  offset = 0
  organization = alias('currentUser.organization')
  courses = []
  count = 0

  constructor() {
    super(...arguments);
    this.infiniteScroll = () => {
      if (document.getElementById('load-more') != null) {
        if (window.pageYOffset >= (document.getElementById('load-more').offsetTop - window.innerHeight)) {
          this.loadMore();
        }
      }
    }
  }

  didReceiveAttrs () {
    this._super(...arguments)
    this.fetchAllCourses.perform();
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
   * Fetch courses on the 'All Courses' page
   */

  @restartableTask
  *fetchAllCourses () {
    const organization = this.get('currentUser.organization') || this.org
    const extraWhere = {}

    if (organization) {
      extraWhere.organization = organization
    }

    const nextCourses = yield this.store.query ('course', {
      include: 'instructors,runs',
      sort: 'difficulty',
      exclude: 'ratings,instructors.*',
      filter: {
        unlisted: false,
        ...extraWhere
      },
      page: {
        limit: this.limit,
        offset: this.offset
      }
    })

    this.set('count', nextCourses.meta.pagination.count);
    this.courses.addObjects(nextCourses)
  }
  
  /**
   * 'Load More' Button Action Handler for 'All Courses'
   */

  @action
  loadMore () {
    this.set('offset', this.offset + 8);
    this.fetchAllCourses.perform();
  }
}
