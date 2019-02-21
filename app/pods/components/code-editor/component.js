import Component from "@ember/component";
import { action, computed } from "ember-decorators/object";

export default class EditorClass extends Component {
  classNames = ["height-100"];
  isLanguageSelectOpen = false;
  allLanguages = [
    {
      name: "C++",
      code: "cpp",
      mode: "ace/mode/c_cpp",
      source: ""
    },
    {
      name: "C",
      code: "c",
      mode: "ace/mode/c_cpp",
      source: ""
    },
    {
      name: "Python 2.7",
      code: "py2",
      mode: "ace/mode/python",
      source: ""
    },
    {
      name: "Python 3",
      code: "py3",
      mode: "ace/mode/python",
      source: ""
    },
    {
      name: "Node",
      code: "js",
      mode: "ace/mode/javascript",
      source: ""
    },
    {
      name: "Java 8",
      code: "java",
      mode: "ace/mode/java",
      source: ""
    },
    {
      name: "C#",
      code: "csharp",
      mode: "ace/mode/csharp",
      source: ""
    }
  ];

  customInput = "";
  isRunOutput = true;

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
        lang.aliases = [];
      }
      const stub = stubs.find(stub => {
        return (
          stub.language === lang.code || lang.aliases.includes(stub.language)
        );
      });
      if (stub && stub.body) lang.source = stub.body;
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
}
