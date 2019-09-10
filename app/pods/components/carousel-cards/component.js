import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action } from '@ember/object'

class carouselCard {
  constructor (el, cssConf = {}) {
    this.element = el
    this.translateX = 0
    this.translateY = 0
    Object.keys(cssConf).forEach(key => {
      this.element.style[key] = cssConf[key]
    })
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

  showContent () {
    Array.from(this.element.children).forEach(c => c.style.display = 'block')
  }

  hideContent () {
    Array.from(this.element.children).forEach(c => c.style.display = 'none')
  }

  apply () {
    this.element.style.height = this.height + "px"
    this.element.style.transform = `translate(${this.translateX}%, ${this.translateY}%)`
  }
}


export default class CarouselCards extends Component {
  @service store

  currentIndex = 2

  classNames = ['h-100']
  
  didInsertElement () {
    this._super(...arguments)
    this.get('getCarouselCardsTask').perform()
  }

  @restartableTask getCarouselCardsTask = function *() {
    const cards = yield this.get('store').query('carousel_card', {
      sort: 'order'
    })
    const cardArr = cards.toArray()
    let x = cardArr[0] 
    cardArr[0] = cardArr[1]
    cardArr[1] = x
    this.set('cards', cardArr)
  }

  didRender () {
    this._super(...arguments)
    const carouselCardElements = Array.from(document.querySelectorAll('.card-stack > .border-card')).map(el => {
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
        card.setHeight(300)
        card.setTranslateY(0)
        card.addTranslateX(-110*factor)
        card.showContent()
        
      } else if (i == currentIndex-normalize) {
        card.setHeight(300)
        card.setTranslateY(0)
        card.addTranslateX(-16*factor)
        card.showContent()
      } else if (i <= currentIndex+1-normalize ) {
        card.setHeight(192)
        card.addTranslateX(-16*factor)
        card.setTranslateY(20)
        card.hideContent()
      } else if (i <= currentIndex+2-normalize) {
        card.setHeight(142)
        card.setTranslateY(45)
        card.addTranslateX(-16*factor)
        card.hideContent()
      }

      if (i <= currentIndex+2)
        card.apply()
    }
  }

  @action
  next () {
    this._reRender(1)
    this.incrementProperty('currentIndex')
  }

  @action
  prev () {
    this.decrementProperty('currentIndex')
    this._reRender(-1)
  }




}
