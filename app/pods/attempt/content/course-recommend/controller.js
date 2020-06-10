import Controller from '@ember/controller';

export default class AttemptContentCourseRecommendController extends Controller { 
  get courseDuration(){
    return this.course.topRun.totalDuration * 100
  }
}
