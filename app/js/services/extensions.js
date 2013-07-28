define(['app', 'lodash'], function(app, _) {
  app.factory('extensions', function() {
    var Extensions = function() {
      var self = this;
      this.overdue = 1;
      this.due_today = 2;
      this.active = 3;
      this.unscheduled = 4;
      this.scheduled = 5;
      this.completed = 6;
      this.sorting = [
        {id: 'All', name: 'All'},
        {id: 'Available', name: 'Available'},
        {id: 'Overdued', name: 'Overdued'},
        {id: 'Completed', name: 'Completed'},
        {id: 'Remaining', name: 'Remaining'},
      ];

      this.filter = function(tasks, sort) {
        if (sort.id === 'All') {
          return tasks;
        }
        var now = self.getStartTime();
        return _.filter(tasks, function(task){
          if (sort.id === 'Completed' && task.isCompleted) {
            return true;
          }
          if (sort.id === 'Remaining' && !task.isCompleted) {
            return true;
          }
          if (sort.id === 'Available' && !task.isCompleted && (!task.startDate || self.getStartTime(task.startDate) > now)) {
            return true;
          }
          if (sort.id === 'Overdued' && self.getTaskStatus(task) == self.overdue) {
            return true;
          }
        });
      };

      this.getTaskStatus = function(task) {
        var startOfToday = self.getStartTime();
        if (task.isCompleted === true) {
          return self.completed;
        }
        if (task.startDate && self.getStartTime(task.startDate) >= startOfToday) {
          return self.scheduled;
        }
        if (!task.dueDate) {
          return self.unscheduled;
        }
        var dueDate = self.getStartTime(task.dueDate);
        if (dueDate < startOfToday) {
          return self.overdue;
        }
        return dueDate === startOfToday ? self.due_today : self.active;
      };

      this.getTaskWeight = function(task){
        return this.getTaskStatus(task) +(task.dueDate || '2000-01-01') + task.name;
      }

      this.getStartTime = function(date) {
        if(!date){
          date = new Date();
        }else{
           date = new Date(date);
        }
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
       };

       this.getDueDate = function(task){
        if(!task.dueDate){
          return '';
        }
        if(self.getStartTime(task.dueDate) < self.getStartTime()){
          return 'overdued';
        }
        if(self.getStartTime(task.dueDate) == self.getStartTime()){
          return 'due today';
        }
        return 'due ' + task.dueDate;
       }

      this.getTasksAmountString = function(amount, overdueAmount) {
        if (amount === 0) {
          return 'no tasks';
        }
        var word = amount % 10 == 1 && amount % 100 != 11 ? 'task' : 'tasks';
        var overdueWord = 'overdue';
        return overdueAmount == 0 ? amount + " " + word : amount + " " + word + ", " + overdueAmount + " " + overdueWord;
      };

    };
    return new Extensions();
  });
});
