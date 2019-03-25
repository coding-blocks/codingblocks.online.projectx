import Component from "@ember/component"
import { action, computed } from "@ember-decorators/object"
import { set } from '@ember/object'
import { inject as service } from '@ember-decorators/service';

export default class EditorClass extends Component {
  classNames = ["height-100"];
  isLanguageSelectOpen = false;
  allLanguages = [
    {
      name: "C++",
      code: "cpp",
      mode: "cpp",
      source: ""
    },
    {
      name: "C",
      code: "c",
      mode: "c",
      source: ""
    },
    {
      name: "Python 2.7",
      code: "py2",
      mode: "python",
      source: ""
    },
    {
      name: "Python 3",
      code: "py3",
      mode: "python",
      source: ""
    },
    {
      name: "Node",
      code: "js",
      mode: "javascript",
      source: ""
    },
    {
      name: "Java 8",
      code: "java",
      mode: "java",
      source: ""
    },
    {
      name: "C#",
      code: "csharp",
      mode: "csharp",
      source: ""
    }
  ];

  customInput = "";
  isRunOutput = true;
  ref = "-LaLRKr2xor7doqVsDbO"

  @service firepad

  didReceiveAttrs() {
    this._super(...arguments);
    this.setCodeStubs();
    const allLanguages = this.get("allLanguages") || [];
    this.selectLanguage(allLanguages[0]);
  }

  setCodeStubs() {
    const allLanguages = this.get("allLanguages") || [];
    const stubs = this.get("stubs");

    allLanguages.forEach(lang => {
      if (!lang.aliases) {
        set(lang, 'aliases', [])
      }
      const stub = stubs.find(stub => {
        return (
          stub.language === lang.code || lang.aliases.includes(stub.language)
        );
      });
      if (stub && stub.body) set(lang, 'source', stub.body)
    });
  }

  @computed("runCodeTask.isRunning", "submitCodeTask.isRunning")
  get isTaskRunning() {
    return (
      this.get("runCodeTask.isRunning") || this.get("submitCodeTask.isRunning")
    );
  }

  @action
  openLanguageSelectBox() {
    this.toggleProperty("isLanguageSelectOpen");
  }

  @action
  selectLanguage(lang) {
    this.set("isLanguageSelectOpen", false);
    this.set("selectedLanguage", lang);

  }

  @action
  changeCustomInput(e) {
    this.set("customInput", e.target.innerText);
  }

  @action
  runCode() {
    const config = {
      lang: this.get("selectedLanguage.code"),
      input: window.btoa(this.get("customInput")),
      source: window.btoa(this.get("selectedLanguage.source"))
    };
    this.get("runCodeTask").perform(config);
    this.set("isRunOutput", true);
  }

  @action
  submitCode() {
    const config = {
      lang: this.get("selectedLanguage.code"),
      source: window.btoa(this.get("selectedLanguage.source"))
    };
    this.get("submitCodeTask").perform(config);
    this.set("isRunOutput", false);
  }

  @action 
  toggle(modalContentType){
    this.sendAction('toggleModal', modalContentType);
  }

  didInsertElement () {
    this._super(...arguments)
    const monacoIframe = document.querySelector('iframe[src*="ember-monaco"]')
    monacoIframe.addEventListener('load', () => {
      const iframeWindow = monacoIframe.contentWindow
      
      // Get the editor reference and set monaco global
      this.editor = iframeWindow.editor
      window.monaco = iframeWindow.monaco

      const firepad = this.firepad
      firepad.set("editor", this.editor)
    })
  }
  
}
