import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object'
import $ from 'jquery';

class carouselCard {
  constructor (el, cssConf = {}) {
    this.element = el
    this.translateX = 0
    this.translateY = 0
    $(this.element).css(cssConf)
  }

  setTranslateY (val) {
    this.translateY = val
  }

  addTranslateX (val) {
    this.translateX += val
  }

  setHeight (h) {
    this.height = h
  }

  apply () {
    $(this.element).css({
      height: this.height,
      transform: `translate(${this.translateX}%, ${this.translateY}%)`
    })
  }
}


export default class CarouselCards extends Component {
  @service store

  currentIndex = 2

  didInsertElement () {
    this._super(...arguments)
    this.get('getCarouselCardsTask').perform()
  }

  getCarouselCardsTask = task(function * () {
    const cards = yield this.get('store').findAll('carousel_card')
    this.set('cards', cards)
  })

  didRender () {
    this._super(...arguments)
    const carouselCardElements = Array.from(document.querySelectorAll('.card-stack > .card')).map(el => {
      return new carouselCard (el, {
        transition: '0.8s'
      })
    })
    this.set('carouselCardElements', carouselCardElements)
  }

  _reRender (factor) {
    const currentIndex = this.get('currentIndex')
    const carouselCards = this.get('carouselCardElements')
    if (currentIndex < 2) {
      this.set('currentIndex', 2)
      return;
    }

    if  (currentIndex >= 5) {
      this.set('currentIndex', 4)
      return
    }

    for(let i = 0 ; i < carouselCards.length ; i++) {
      let card = carouselCards[i]

      let normalize = factor == -1 ? 1 : 0
      if (i < currentIndex) {
        card.setHeight(325)
        card.setTranslateY(0)
        card.addTranslateX(-110*factor)
      } else if (i == currentIndex-normalize) {
        card.setHeight(325)
        card.setTranslateY(0)
        card.addTranslateX(-16*factor)
      } else if (i <= currentIndex+1-normalize ) {
        card.setHeight(239)
        card.addTranslateX(-16*factor)
        card.setTranslateY(20)
      } else if (i <= currentIndex+2-normalize) {
        card.setHeight(142)
        card.setTranslateY(72)
        card.addTranslateX(-16*factor)
      }

      if (i <= currentIndex+2)
        card.apply()
    }
  }

  @action
  prev () {
    this._reRender(1)
    this.incrementProperty('currentIndex')
  }

  @action
  next () {
    this.decrementProperty('currentIndex')
    this._reRender(-1)
  }




}
