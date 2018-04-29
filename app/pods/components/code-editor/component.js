import Component from '@ember/component';
import {action, computed } from 'ember-decorators/object'

export default class EditorClass extends Component {
  classNames = ['height-100']

  isLanguageSelectOpen = false
  allLanguages = [{
    name: 'C++',
    code: 'cpp',
    mode: 'ace/mode/c_cpp',
    source: ''
  }, {
    name: 'JAVA',
    code: 'java',
    mode: 'ace/mode/java',
    source: ''
  }, {
    name: 'C#',
    code: 'csharp',
    mode: 'ace/mode/csharp',
    source: ''
  }]

  selectedLanguage
  customInput = ''
  isRunOutput = true

  didReceiveAttrs () {
    this._super(...arguments)
    this.setCodeStubs()
    const allLanguages =  this.get('allLanguages') || []
    this.selectLanguage(allLanguages[0])
  }
  
  setCodeStubs () {
    const allLanguages = this.get('allLanguages') || []
    const stubs = this.get('stubs')

    allLanguages.forEach(lang => {
      if (!lang.aliases) {
        lang.aliases = []
      }
      const stub = stubs.find(stub => {
        return stub.language === lang.code || lang.aliases.includes(stub.language)
      })
      if (stub)
        lang.source = stub.body
    })
  }

  @computed ('runCodeTask.isRunning', 'submitCodeTask.isRunning')
  get isTaskRunning () {
    return this.get('runCodeTask.isRunning') || this.get('submitCodeTask.isRunning')
  }
  
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
      source: window.btoa(this.get('selectedLanguage.source'))
    }
    this.get('runCodeTask').perform(config)
    this.set('isRunOutput', true)
  }

  @action
  submitCode () {
    const config = {
      lang: this.get('selectedLanguage.code'),
      source: window.btoa(this.get('selectedLanguage.source'))
    }
    this.get('submitCodeTask').perform(config)
    this.set('isRunOutput', false)
  }

  
}
