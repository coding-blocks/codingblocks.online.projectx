import DS from 'ember-data';
import { computed } from '@ember/object';
import env from 'codingblocks-online/config/environment';
import { isNone } from '@ember/utils';

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
    slug: DS.attr('string'),
    difficulty: DS.attr('number'),
    categoryName: DS.attr(),
    categoryId: DS.attr('number'),
    doubtSubCategoryId: DS.attr('number'),
    price: computed('fees', 'isFree', function () {
    if (this.get('isFree'))
        return 0
    else
        return this.get('fees').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    rating: DS.attr(),
    topRun: computed('activeRuns', 'runs', function () {
        let runs = this.get('activeRuns')

        // if we don't have activeRuns
        if (isNone(runs) || !runs.get('length')) {
          runs = this.get('runs')
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
      return this.get('feedbacks').objectAt(0)
    }),
    canHazDoubtsLink: computed.and('categoryId', 'doubtSubCategoryId'),
    doubtsLink: computed('categoryId', 'doubtSubCategoryId', function () {
      return `${env.discussBaseUrl}/c/${this.get('categoryId')}/${this.get('doubtSubCategoryId')}`
    }),
    difficultyName: computed('difficulty', function () {
      switch(+this.get('difficulty')) {
        case 0: return 'beginner' ; break;
        case 1: return 'advanced'; break;
        case 2: return 'expert'; break
        default: return 'beginner'; break;
      }
    }),
    identifier: computed('slug', 'id', function () {
      return this.get('slug') || this.get('id')
    }),
    ratings: DS.hasMany('rating'),
    ratingCarousel: computed('ratings', function(){
      return this.get('ratings').map(rating=>{
        if(Ember.isEmpty(rating.get('heading')) && Ember.isEmpty(rating.get('review'))){
          rating.setProperties({shown: false})
        }else{
          rating.setProperties({shown: true})
        }
        return rating;
      })
    }),
    userRating: computed('ratings', function () {
      return this.get('ratings').objectAt(0)
    })
});
