import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend({
  initialState() {
    return {
      showInstructions: true
    };
  }
});


export default Storage;
