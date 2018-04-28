import Component from '@ember/component';
import {action } from 'ember-decorators/object'

export default class EditorClass extends Component {
  classNames = ['height-100']

  isLanguageSelectOpen = false
  allLanguages = [{
    name: 'C++',
    code: 'cpp',
    mode: 'c_cpp'
  }, {
    name: 'JAVA',
    code: 'java',
    mode: 'java'
  }]

  selectedLanguage = {
    name: 'C++',
    code: 'cpp',
    mode: 'c_cpp'
  }
  customInput = ''
  source = 'your code goes here'
  output = ''



  @action
  openLanguageSelectBox () {
    this.toggleProperty('isLanguageSelectOpen')
  }

  @action
  selectLanguage (lang) {
    this.set('isLanguageSelectOpen', false)
    this.set('selectedLanguage', lang)
  }

  @action
  changeCustomInput (e) {
    this.set('customInput', e.target.innerText)
  }

  @action
  runCode () {
    const config = {
      lang: this.get('selectedLanguage.code'),
      input: window.btoa(this.get('customInput')),
      source: window.btoa(this.get('source'))
    }
    this.get('runCodeTask').perform(config)
  }

  @action
  submitCode () {
    const config = {
      lang: this.get('selectedLanguage.code'),
      source: window.btoa(this.get('source'))
    }
    this.get('submitCodeTask').perform(config)
  }

}
