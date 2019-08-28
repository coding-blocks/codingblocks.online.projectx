import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import DS from 'ember-data';
import { reads } from '@ember/object/computed';
import { getSeoSchemaForCourse } from 'codingblocks-online/utils/seo'

const { NotFoundError } = DS;

export default Route.extend({
  headData: service(),
  api: service(),
  store: service(),
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),
  beforeModel () {
      if (!this.isFastBoot)
        window.scrollTo(0,0)
    },
    async model (params) {
      const shoebox = this.fastboot.shoebox
      const shoeboxStore = shoebox.retrieve('courses') || {}

      if (this.fastboot.isFastBoot) {
        // in fastboot so request and store in shoebox
        try {
          const course = await this.store.queryRecord("course",{
            custom: {
              ext: 'url',
              url: `${params.courseId}`
            }
          })
          // const course = await this.api.request(`courses/${params.courseId}`)
          // console.log(course.toJSON())
          shoeboxStore[params.courseId] = course.id
          shoebox.put('courses', shoeboxStore)

          return course


        } catch (err) {
          if (err instanceof NotFoundError) {
            this.transitionTo('/404')
          }
        }

        
      } else {
        // in browser; use findRecord 
        // debugger;
        
        return this.store.findRecord("course", shoeboxStore[params.courseId])
      }
      
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
