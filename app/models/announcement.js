import DS from 'ember-data';
import _moment from 'ember-moment/computeds/moment';
import fromNow from 'ember-moment/computeds/from-now';

export default DS.Model.extend ({
  title: DS.attr ("string"),
  text: DS.attr ("string"),
  createdAt: DS.attr (),
  updatedAt: DS.attr (),
  run: DS.belongsTo ('run'),
  user: DS.belongsTo ('user'),
  elapsedTime: fromNow (
    _moment ('createdAt'),
    false
  ),
});
