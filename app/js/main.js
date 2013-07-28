require.config({
  shim: {
    'angular': {
      exports: 'angular'
    }
  },
  paths: {
    app: 'js/app',
    angular: 'js/vendor/angular.min',
    lodash: 'js/vendor/lodash',
    async: 'js/vendor/async'
  },
  baseUrl: '/'
});

(function() {
  require([
    'app',
    'js/vendor/mobile-nav.js',
    'js/vendor/pouchdb.js',
    'async',
    'angular',

    // services
    'js/services/extensions.js',
    'js/services/database.js',

    // controllers
    'js/controllers/dashboard.js',
    'js/controllers/about.js',
    'js/controllers/context.js',
    'js/controllers/project.js',
    'js/controllers/edit-context.js',
    'js/controllers/edit-project.js',
    'js/controllers/edit-task.js'
  ], function() {
    angular.bootstrap(document, ['app']);
  });
})();
