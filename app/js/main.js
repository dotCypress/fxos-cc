require.config({
  shim: {
    'angular': {
      exports: 'angular'
    }
  },
  paths: {
    app: 'js/app',
    angular: 'js/vendor/angular.min',
    lodash: 'js/vendor/lodash'
  },
  baseUrl: '/'
});

(function() {
  require([
    'app',
    'js/vendor/mobile-nav.js',
    'js/vendor/pouchdb.js',
    'angular',

    // services
    'js/services/extensions.js',
    'js/services/database.js',

    // controllers
    'js/controllers/dashboard.js',
    'js/controllers/edit-task.js'
  ], function() {
    angular.bootstrap(document, ['app']);
  });
})();
