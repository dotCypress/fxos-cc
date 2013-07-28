define(['app', 'lodash', 'async'], function(app, _, async) {
  app.factory('database', ['extensions', function(extensions) {

    var DB = function() {
      var self = this;
      var prefix = 'cc.1.0.';
      var tasks = new PouchDB(prefix + 'tasks');
      var projects = new PouchDB(prefix + 'projects');
      var contexts = new PouchDB(prefix + 'contexts');
      var meta = new PouchDB(prefix + 'meta');
      this.cache = {};

      this.updateCache = function(cb){
        tasks.allDocs({include_docs: true}, function(err, doc) {
          var all =  _.pluck(doc.rows, 'doc');
          var notCompleted = _.filter(all, function(task){
            var status = extensions.getTaskStatus(task);
            return status !== extensions.completed;
          });
          self.cache = {};
          _.forEach(notCompleted, function (task) {
            var projectKey = 'p' + task.projectId;
            var status = extensions.getTaskStatus(task);
            if(!self.cache[projectKey]){
              self.cache[projectKey] = {total: 0, overdue: 0};
            }
            self.cache[projectKey].total++;
            if(status === extensions.overdue){
              self.cache[projectKey].overdue++;
            }
            var contextKey = 'c' + task.contextId;
            if(!self.cache[contextKey]){
              self.cache[contextKey] = {total: 0, overdue: 0};
            }
             if(status === extensions.overdue){
              self.cache[contextKey].overdue++;
            }
            self.cache[contextKey].total++;
          });
          cb();
        });
      };

      this.getProjectInfo = function(project){
        var holder = self.cache['p' + project._id] || {total: 0, overdue: 0};
        return extensions.getTasksAmountString(holder.total, holder.overdue);
      }

      this.getContextInfo = function(context){
        var holder = self.cache['c' + context._id] || {total: 0, overdue: 0};
        return extensions.getTasksAmountString(holder.total, holder.overdue);
      }

      this.buildPredefined = function(callback){
        meta.get('1', function (err, doc) {
          if(doc){
            return self.updateCache(callback);
          }
          meta.put({_id: '1', name: 'stub'}, function (err) {
            async.series([
              function(cb){self.saveProject({_id: '200', name: 'Bussines', memo: 'Business Projects'}, cb);},
              function(cb){self.saveProject({_id: '201', name: 'Personal', memo: 'Family related, self improvement and all other personal projects'}, cb);},
              function(cb){self.saveContext({_id: '300', name: '@home'}, cb);},
              function(cb){self.saveContext({_id: '301', name: '@office'}, cb);},
              function(cb){self.saveContext({_id: '302', name: 'In the morning'}, cb);},
              function(cb){self.saveContext({_id: '303', name: '@garage'}, cb);},
              function(cb){self.saveContext({_id: '304', name: 'If got some free time'}, cb);},
              function(cb){self.saveContext({_id: '305', name: 'Online'}, cb);},
              function(cb){self.saveTask({_id: '400', name: 'Follow Tarasov Mobile on twitter: @TarasovMobile', startDate: null, dueDate: new Date(), contextId: '305', projectId: '201'}, cb);},
              function(cb){self.saveTask({_id: '401', name: 'Check out the Chaos Control web-page: www.chaos-control.mobi', startDate: null, dueDate: new Date(), contextId: '305', projectId: '201'}, cb);},
              function(cb){self.saveTask({_id: '402', name: 'Join us at Facebook: http://facebook.com/TarasovMobile', startDate: null, dueDate: new Date(), contextId: '305', projectId: '201'}, cb);},
              function(cb){self.saveTask({_id: '403', name: 'Order "Getting Things Done" book by David Allen', startDate: null, dueDate: null, contextId: '304', projectId: '200'}, cb);}
            ], callback);
          });
        });
      };

      this.getDueTasks = function(cb) {
        tasks.allDocs({include_docs: true}, function(err, doc) {
          var all =  _.pluck(doc.rows, 'doc');
          var due = _.filter(all, function(task){
            var status = extensions.getTaskStatus(task);
            return status === extensions.due_today || status === extensions.overdue;
          });
          return cb(null, _.sortBy(due, function (task) {
            return extensions.getTaskWeight(task);
          }));
        });
      };

      this.getProjectTasks = function(projectId, cb) {
        tasks.allDocs({include_docs: true}, function(err, doc) {
          var all = _.pluck(doc.rows, 'doc');
          var filtered = _.where(all , {'projectId' : projectId});
          return cb(null, _.sortBy(filtered, function (task) {
            return extensions.getTaskWeight(task);
          }));
        });
      };

      this.getContextTasks = function(contextId, cb) {
        tasks.allDocs({include_docs: true}, function(err, doc) {
          var all = _.pluck(doc.rows, 'doc');
          var filtered = _.where(all , {'contextId' : contextId});
          return cb(null, _.sortBy(filtered, function (task) {
            return extensions.getTaskWeight(task);
          }));
        });
      };

      this.saveTask = function(task, cb) {
        tasks.put(task, function () {
          self.updateCache(cb);
        });
      };

      this.deleteTask = function(task, cb) {
        tasks.remove(task, function () {
          self.updateCache(cb);
        });
      };

      this.getTaskById = function(id, cb) {
        tasks.get(id, function(err, doc) {
          return cb(err, doc);
        });
      };

      this.getProjects = function(parentFolderId, cb) {
        projects.allDocs({include_docs: true}, function(err, doc) {
          var projects = _.pluck(doc.rows, 'doc');
          projects.unshift({_id: '1', name: 'Single tasks'});
          return cb(null, _.sortBy(projects, function (project) {
            return project.name.toLowerCase();
          }));
        });
      };

      this.saveProject = function(project, cb) {
        projects.put(project, function () {
          self.updateCache(cb);
        });
      };

      this.deleteProject = function(project, cb) {
        self.getProjectTasks(project._id, function(err, child){
          var steps = _.map(child, function (task) {
            return function(cb){
              tasks.remove(task, cb);
            };
          });
          async.series(steps, function () {
            projects.remove(project, function () {
              self.updateCache(cb);
            });
          });
        });
      };

      this.getProjectById = function(id, cb) {
        projects.get(id, function(err, doc) {
          return cb(err, doc);
        });
      };

      this.getContexts = function(parentContextId, cb) {
        contexts.allDocs({include_docs: true}, function(err, doc) {
           return cb(null, _.sortBy(_.pluck(doc.rows, 'doc'), function (project) {
            return project.name.toLowerCase();
          }));
        });
      };

      this.saveContext = function(context, cb) {
        contexts.put(context, function () {
          self.updateCache(cb);
        });
      };

      this.deleteContext = function(context, cb) {
        self.getContextTasks(context._id, function(err, child){
          var steps = _.map(child, function (task) {
            return function(cb){
              task.contextId = null;
              tasks.put(task, cb);
            };
          });
          async.series(steps, function () {
            contexts.remove(context, function () {
              self.updateCache(cb);
            });
          });
        });
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
