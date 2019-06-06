import { computed } from '@ember/object';
import DS from 'ember-data';
import env from 'codingblocks-online/config/environment'
import moment from 'moment';

export default DS.Model.extend({
  title: DS.attr(),
  start: DS.attr(),
  description: DS.attr(),
  team1: DS.attr(),
  team2: DS.attr(),
  predictionEnd: DS.attr(),
  cricketCupQuestions: DS.hasMany('cricketCupQuestion'),
  hasPredictionEnded: computed('predictionEnd', function (){
    return moment() > moment(this.get('predictionEnd'))
  }),
  resultDeclared: computed('cricketCupQuestions', function(){
    return !!this.get('cricketCupQuestions').findBy('correctChoiceId', undefined)
  })
})
