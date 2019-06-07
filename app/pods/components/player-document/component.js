import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default class DocumentComponent extends Component {
  @alias("payload") document
}