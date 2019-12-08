import Component from '@ember/component';

export default class SectionList extends Component {
  didReceiveAttrs() {
    if (!this.initialSectionId) {
      this.set('initialSectionId', this.currentSectionId)
    }
  }
}
