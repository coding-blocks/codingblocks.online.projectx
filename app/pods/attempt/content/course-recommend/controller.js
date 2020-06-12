import Controller from '@ember/controller';
import { iconForTier } from 'codingblocks-online/utils/run'
import { computed } from '@ember/object';

export default class AttemptContentCourseRecommendController extends Controller { 
  get courseDuration(){
    return Math.round((this.course.topRun.end - this.course.topRun.start)/ (60 * 60 * 24 * 30))
  }


  @computed('course.topRun.tier')
  get tierIcon() {
    return iconForTier(this.course.topRun.tier)
  }
}
