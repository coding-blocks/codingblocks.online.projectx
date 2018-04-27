import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    name: DS.attr(),
    title: DS.attr(),
    subtitle: DS.attr(),
    summary: DS.attr(),
    fees: DS.attr(),
    promoVideo: DS.attr(),
    coverImage: DS.attr(),
    logo: DS.attr(),
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
    ratingCount: DS.attr(),
    videosDuration: DS.attr(),
    type: DS.attr(),
    color: DS.attr(),
    backgroundImage: DS.attr(),
    topRun: computed('runs', function () {
        const runs = this.get('runs')
        const now = +new Date() / 1000.0
        const currentRun = runs.find( (run, index) => {
            return run.get('start') < now && run.get('end') > now 
        })
        return currentRun || runs.sortBy('start').objectAt(0)
    }),
    totalContents: computed('sections.@each.contents.@each', function () {
        //debugger;
        return this.get('sections').reduce( (acc, section) => {
            return acc + section.get('contents.length')
        }, 0)
    }),
    completedContents: computed('sections.@each.doneContents', function () {
        return this.get('sections').reduce( (acc, section) => {
            return acc + section.get('doneContents.length')
        }, 0)
    }),
    sections: DS.hasMany('section'),
    runs: DS.hasMany('run'),
    instructor: DS.belongsTo('instructor'),
    feedbacks: DS.hasMany('feedback'),
    feedback: computed('feedbacks', function () {
      return this.get('feedbacks').objectAt(0)
    })
});
