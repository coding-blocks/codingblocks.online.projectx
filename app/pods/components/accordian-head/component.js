import Component from '@ember/component';
import { action } from 'ember-decorators/object'

export default class AccordianHeadComponent extends Component {
    collapsed =true

    @action
    toggle () {
        this.toggleProperty("collapsed")
    }
}
