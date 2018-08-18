module.exports = class TaskRunner {
  constructor(tasks) {
    this.tasks = tasks;
  }

  run(arrOfTasks, cb) {
    console.log("In a class", this);
    let i = 0;
    let arrLen = arrOfTasks.length;

    function callAsync(task) {
      if (Array.isArray(task)) {
        task.forEach(item => {
          item();
        });
      } else {
        task(() => {
          if (i + 1 < arrLen) {
            callAsync(arrOfTasks[++i]);
          } else {
            let err = null;
            let msg = "All tasks are completed";
            cb(err, msg);
          }
        });
      }
    }

    callAsync(arrOfTasks[0]);
  }
};
