import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  start: DS.attr(),
  description: DS.attr(),
  team1: DS.attr(),
  team2: DS.attr(),
  predictionEnd: DS.attr(),
  cricketCupQuestions: DS.hasMany('cricketCupQuestion'),
  resultDeclared: computed('cricketCupQuestions', function() {
    return !this.get('cricketCupQuestions').findBy('correctChoiceId', null);
  }),
});
