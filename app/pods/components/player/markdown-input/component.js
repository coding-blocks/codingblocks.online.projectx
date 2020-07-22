import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default class MarkdownInputComponent extends Component {
  classNameBindings = ['dragClass']
  dragClass = 'drag-deactivated'

  @service minio

  dragOver(event) {
    event.preventDefault();
    this.set('dragClass', 'drag-activated')
  }

  dragLeave(event) {
    event.preventDefault();
    this.set('dragClass', 'drag-deactivated');
  }

  async drop(e) {
    e.preventDefault()
    e.stopPropagation()
    const [file] = e?.dataTransfer?.files || []
    if (!file || file.type.indexOf("image") === -1)
      return;
    
    const resp = await this.minio.upload(file)
    this.set('text', `${this.text || ''} \n <img src="${resp.link}">`)
    this.set('dragClass', 'drag-deactivated');
  }
}