import { and } from '@ember/object/computed';
import DS from 'ember-data';
import { computed } from '@ember/object';
import env from 'codingblocks-online/config/environment';
import { isNone, isEmpty } from '@ember/utils';

export default DS.Model.extend({
    name: DS.attr(),
    title: DS.attr(),
    subtitle: DS.attr(),
    summary: DS.attr(),
    fees: DS.attr(),
    promoVideo: DS.attr(),
    coverImage: DS.attr(),
    logo: DS.attr(),
    language: DS.attr(),
    faq: DS.attr(),
    slug: DS.attr('string'),
    difficulty: DS.attr('number'),
    categoryName: DS.attr(),
    categoryId: DS.attr('number'),
    doubtSubCategoryId: DS.attr('number'),
    price: computed('fees', 'isFree', function () {
    if (this.isFree)
        return 0
    else
        return this.fees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }),
    popularity: DS.attr(),
    hoursPerDay: DS.attr(),
    isFree: DS.attr(),
    duration: DS.attr(),
    lecturesCount: DS.attr(),
    reviewCount: DS.attr(),
    videosDuration: DS.attr(),
    type: DS.attr(),
    color: DS.attr(),
    buyNowLink: DS.attr(),
    backgroundImage: DS.attr(),
    rating: DS.attr('number'),
    seoMeta: DS.attr(),
    topRun: computed('activeRuns', 'runs', function () {
        let runs = this.activeRuns

        // if we don't have activeRuns
        if (isNone(runs) || !runs.get('length')) {
          runs = this.runs
        }
        const now = +new Date() / 1000.0
        const currentRuns = runs.filter( (run, index) => {
            return run.get('enrollmentStart') < now && run.get('enrollmentEnd') > now && !run.get('unlisted')
        })
        return currentRuns.sortBy('price').objectAt(0) || runs.sortBy('price').objectAt(0)
    }),
    runs: DS.hasMany('run'),
    activeRuns: DS.hasMany('run', {inverse: null}),
    instructors: DS.hasMany('instructor'),
    feedbacks: DS.hasMany('feedback'),
    feedback: computed('feedbacks', function () {
      return this.feedbacks.objectAt(0);
    }),
    canHazDoubtsLink: and('categoryId', 'doubtSubCategoryId'),
    doubtsLink: computed('categoryId', 'doubtSubCategoryId', function () {
      return `${env.discussBaseUrl}/c/${this.categoryId}/${this.doubtSubCategoryId}`;
    }),
    difficultyName: computed('difficulty', function () {
      switch(+this.difficulty) {
        case 0: return 'beginner' ; break;
        case 1: return 'advanced'; break;
        case 2: return 'expert'; break
        default: return 'beginner'; break;
      }
    }),
    identifier: computed('slug', 'id', function () {
      return this.slug || this.id;
    }),
    ratings: DS.hasMany('rating'),
    ratingCarousel: computed('ratings', function(){
      return this.ratings.map(rating=>{
        if(isEmpty(rating.get('heading')) && isEmpty(rating.get('review'))){
          rating.setProperties({shown: false})
        }else{
          rating.setProperties({shown: true})
        }
        return rating;
      });
    }),
    userRating: computed('ratings', function () {
      return this.ratings.objectAt(0);
    }),
    organization: DS.attr(),
    coursefeatures: DS.attr(),
    projects: DS.hasMany('projects')
});
