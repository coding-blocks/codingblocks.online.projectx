import DS from 'ember-data';

export default DS.Model.extend ({
  title: DS.attr ("string"),
  text: DS.attr ("string"),
  createdAt: DS.attr (),
  updatedAt: DS.attr (),
  run: DS.belongsTo ('run'),
  elapsedTime: Ember.computed ('createdAt', function () {
    const now = new Date (),
      createdAt = new Date (this.get ('createdAt'))
    ;

    const diff = Math.floor ((now.getTime () - createdAt.getTime ()) / 1000)

    console.log (diff)

    if (diff < 3600) {
      return `${Math.floor (diff / 60)} minute(s) ago`
    }
    else if (diff < 86400) {
      return `${Math.floor (diff / 3600)} hour(s) ago`
    }
    else {
      return createdAt.toDateString ()
    }
  })
});
