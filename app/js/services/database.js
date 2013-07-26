define(['app','lodash'], function(app, _) {
  app.factory('database', ['extensions', function(extensions) {

    var DB = function() {
      var tasks = new PouchDB('tasks');
      var projects = new PouchDB('projects');
      var contexts = new PouchDB('contexts');
      var task = {
        _id: new Date().toISOString(),
        name: 'Task 1',
        memo: 'Hello world',
        contextId: 0,
        projectId: 0,
        isCompleted: false,
        startDate: null,
        dueDate:null
      };
      tasks.put(task);

      this.getDueTasks = function(cb) {
        tasks.allDocs({include_docs: true}, function(err, doc) {
          return cb(null, _.pluck(doc.rows, 'doc'));
        });
      };

      this.getProjects = function(parentFolderId, cb) {
        projects.allDocs({include_docs: true}, function(err, doc) {
          return cb(null, _.pluck(doc.rows, 'doc'));
        });
      };

      this.getContexts = function(parentContextId, cb) {
        contexts.allDocs({include_docs: true}, function(err, doc) {
          return cb(null, _.pluck(doc.rows, 'doc'));
        });
      };

      this.saveContext = function(context, cb) {
        contexts.put(context, cb);
      };

      this.deleteContext = function(context, cb) {
        contexts.remove(context, cb);
      };

      this.getContextById = function(id, cb) {
        contexts.get(id, function(err, doc) {
          return cb(err, doc);
        });
      };
    };
    return new DB();
  }]);
});
