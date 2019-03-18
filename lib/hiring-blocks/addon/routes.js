import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
  // Define your engine's route map here
  this.route('listing', function () {
    this.route('job', {path: '/:jobId'})
  })
});
