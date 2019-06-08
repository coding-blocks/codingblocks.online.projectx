import Component from '@ember/component';
import layout from './template';
import {computed} from '@ember/object';

export default Component.extend({
  matchEarnings: computed('predictions', function(){
    return this.get('predictions').reduce((acc, val)=> {
      if (val.get('cricketCupChoice.id') === val.get('cricketCupQuestion.correctChoiceId')){
        acc += +val.get('cricketCupQuestion.score')
      }
      return acc
    }, 0)
  })
});
