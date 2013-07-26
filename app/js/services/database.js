define(['app','lodash'], function(app, _) {
  app.factory('database', ['extensions', function(extensions) {

    var DB = function() {
      var tasks = new PouchDB('tasks');
      var projects = new PouchDB('projects');
      var contexts = new PouchDB('contexts');

      this.getDueTasks = function(cb) {
        tasks.allDocs({include_docs: true}, function(err, doc) {
          return cb(null, _.pluck(doc.rows, 'doc'));
        });
      };

      this.getProjectTasks = function(projectId, cb) {
        tasks.allDocs({include_docs: true}, function(err, doc) {
          var all = _.pluck(doc.rows, 'doc');
          var filtered = _.where(all , {'projectId' : projectId});
          return cb(null, filtered);
        });
      };

      this.saveTask = function(task, cb) {
        tasks.put(task, cb);
      };

      this.deleteTask = function(task, cb) {
        tasks.remove(task, cb);
      };

      this.getTaskById = function(id, cb) {
        tasks.get(id, function(err, doc) {
          return cb(err, doc);
        });
      };

      this.getProjects = function(parentFolderId, cb) {
        projects.allDocs({include_docs: true}, function(err, doc) {
          var projects = _.sortBy(_.pluck(doc.rows, 'doc'), 'name');
          projects.unshift({_id:1, name: 'Single tasks'});
          return cb(null, projects);
        });
      };

      this.saveProject = function(project, cb) {
        projects.put(project, cb);
      };

      this.deleteProject = function(project, cb) {
        projects.remove(project, cb);
      };

      this.getProjectById = function(id, cb) {
        projects.get(id, function(err, doc) {
          return cb(err, doc);
        });
      };

      this.getContexts = function(parentContextId, cb) {
        contexts.allDocs({include_docs: true}, function(err, doc) {
           return cb(null, _.sortBy(_.pluck(doc.rows, 'doc'), 'name'));
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
