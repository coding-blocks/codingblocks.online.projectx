import DS from 'ember-data';
import _moment from 'ember-moment/computeds/moment';
import fromNow from 'ember-moment/computeds/from-now';

export default DS.Model.extend ({
  playerId: DS.attr ()
});
