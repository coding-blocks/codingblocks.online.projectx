import Controller from '@ember/controller';
import { iconForTier } from 'codingblocks-online/utils/run'
import { computed } from '@ember/object';

export default class AttemptContentCourseRecommendController extends Controller { 
  get courseDuration(){
    return this.course.topRun.totalDuration * 100
  }


  @computed('course.topRun.tier')
  get tierIcon() {
    return iconForTier(this.course.topRun.tier)
  }
}
