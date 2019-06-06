import ApplicationAdapter from './application'

export default ApplicationAdapter.extend({
  namespace: 'api/v2/cricket_cup',
  pathForType: () => 'matches'
})