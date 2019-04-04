import Component from '@ember/component';

export default class CourseCardComponent extends Component {

  didInsertElement () {
    this._super(...arguments)
    this.element.addEventListener('click', e => {
      e.stopPropagation()
    })
  }
}
