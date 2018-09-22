const asyncTaskRunner = require("./lib/asyncTaskRunner");

// RUNS ASYNC TASKS SIMULTANEOUSLY 

// Example 
// - task 1 started 
// - task 1 finished
// - task 2 started
// - task 2 finished

function task1(done) {
  console.log("Task 1: Started");
  // Some async operation follows
  setTimeout(function() {
    console.log("Task 1: Finished\n");
    done();
  }, 5000);
}

function task2(done) {
  console.log("Task 2: Started");
  // Some async operation follows
  setTimeout(function() {
    console.log("Task 2: Finished\n");
    done();
  }, 5000);
}

function task3(done) {
  console.log("Task 3: Started");
  // Some async operation follows
  setTimeout(function() {
    console.log("Task 3: Finished\n");
    done();
  }, 5000);
}

function task4(done) {
  console.log("Task 4: Started");
  // Some async operation follows
  setTimeout(function() {
    console.log("Task 4: Finished\n");
    done();
  }, 5000);
}

const task_runner = new asyncTaskRunner();
let err = null;
let success = null;
task_runner.run([task1, task2], (err, success) => {
  console.log("err", err, "success", success);
});
