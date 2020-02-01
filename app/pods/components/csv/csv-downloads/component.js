import Component from '@ember/component';
import { action } from '@ember/object';

export default class CsvDownloads extends Component {
  @action
  download (link) {
    const el = document.createElement('a')
    el.href = link
    el.download = ''
    el.target = '_blank'
    el.click()
  }
}
