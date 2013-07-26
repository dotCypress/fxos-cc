define(['app'], function(app) {
  app.factory('extensions', function() {
    var Extensions = function() {
      this.OVERDUE = 1;
      this.DUE_TODAY = 2;
      this.ACTIVE = 3;
      this.UNSCHEDULED = 4;
      this.SCHEDULED = 5;
      this.COMPLETED = 6;

      this.getTaskStatus = function(task) {
        var startOfToday = getStartTime(new Date());
        var now = new Date();
        if (task.isCompleted === true) {
          return this.COMPLETED;
        }
        if (task.startDate && task.startDate >= now) {
          return this.SCHEDULED;
        }
        if (!task.dueDate) {
          return this.UNSCHEDULED;
        }
        if (task.dueDate < now) {
          return this.OVERDUE;
        }
        return getStartTime(task.dueDate) === startOfToday ? this.DUE_TODAY : this.ACTIVE;
      };

      this.getStartTime = function(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
       };
    };
    return new Extensions();
  });
});
