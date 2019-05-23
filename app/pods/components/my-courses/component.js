import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember-decorators/object/computed';
import { readOnly } from '@ember-decorators/object/computed';
import { action, computed } from '@ember-decorators/object'

export default class MyCoursesTaskComponent extends Component {
  	@service store;
  	@service api;

  	didReceiveAttrs () {
		this._super(...arguments)
		this.limit = 8;
		this.offset = 8;
		this.runs = [];
		this.count = 0;
		this.get('fetchMyCoursesTask').perform()
	}

	/**
	 * Limit and offset sum computed property
	 */

	@computed ("limit", "offset")
	get limitandoffset () {
		console.log(this.get('limit') + this.get('offset'));
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
			page:{
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
