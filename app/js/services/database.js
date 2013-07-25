define(['app'], function(app) {
  app.factory('database', function() {

     var DB = function() {
      var db = new PouchDB('todos');
    //   var item = {
    //      _id: new Date().toISOString(),
    //     title: "Task 1",
    //     description: "This is a list-detail template. Learn more about it at its project page!",
    //     date: new Date(2013, 1, 3)
    //   };
    //   db.put(item, function callback(err, result) {
    //     if (!err) {
    //       console.log('Successfully posted a todo!');
    //     }else{
    //       console.log(err);
    //     }
    //   });

      this.getItems = function(cb) {
        db.allDocs({include_docs: true, descending: true}, function(err, doc) {
          return cb(null, doc.rows);
        });
      };
    };
    return new DB();
  });
});
