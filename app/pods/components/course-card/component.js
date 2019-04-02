import Component from '@ember/component';
import { action } from '@ember-decorators/object';

export default class CourseCardComponent extends Component {
  showPopUp = false

  didInsertElement(){
    const card = this.$(this.element)
    let clickedCard = false
    
    card.on('click', (e)=>{
      clickedCard = true;
    })

    this.$(document).on('click.courseCard', (e)=>{
      if(!clickedCard)
      this.set('showPopUp', false)
      clickedCard = false
    })
  }

  @action
  toggleShowPopUp() {
    this.toggleProperty('showPopUp')
  }

  willDestroyElement() {
    this.$(document).off('click.courseCard')
  }
}
