import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import DS from 'ember-data';
import { getSeoSchemaForCourse } from 'codingblocks-online/utils/seo'

const { NotFoundError } = DS;

export default Route.extend({
  headData: service(),
  api: service(),
  store: service(),
  beforeModel () {
      window.scrollTo(0,0);
    },
    model (params) {
        return this.store.findRecord("course", params.courseId).catch(err => {
          if (err instanceof NotFoundError) {
            this.transitionTo('/404')
          }
        })
    },
    setupController(controller, model) {
        this._super(...arguments)
        controller.set("course", model)
    },
    afterModel(course) {
      const head = this.headData
      
      this.store.query('rating', {
        custom: { ext: 'url', url: `course/${course.id}` },
        page:{
          limit: 1
        }
      }).then(result => {
        head.set('schema', getSeoSchemaForCourse(course, result.toArray()))
      })

      head.setProperties({
        title: course.title,
        description: course.seoMeta,
        image: course.logo,
        url: 'https://online.codingblocks.com/courses/' + course.get('slug')
      })      
    }
 });
