// Async function runs in series. In unstable mode currently. 


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

// Concrete example for reproduction
function task1(done){
  console.log('Task 1: Started');
  // Some async operation follows
  setTimeout(function(){
    console.log('Task 1: Finished\n');
    done();
  }, 5000);
};

function task2(done){
  console.log('Task 2: Started');
  // Some async operation follows
  setTimeout(function(){
    console.log('Task 2: Finished\n');
    done();
  }, 5000);
};

// function task3(done){
//   console.log('Task 3: Started');
//   // Some async operation follows
//   setTimeout(function(){
//     console.log('Task 3: Finished\n');
//     done();
//   }, 5000); 
// }

// function task4(done){
//   console.log('Task 4: Started');
//   // Some async operation follows
//   setTimeout(function(){
//     console.log('Task 4: Finished\n');
//     done();
//   }, 5000); 
// }

// function task5(done){
//   console.log('Task 5: Started');
//   // Some async operation follows
//   setTimeout(function(){
//     console.log('Task 5: Finished\n');
//     done();
//   }, 5000); 
// }

function TaskRunner () {
    this.run =  function (arr) {
    
    var  i = 0;
    var arrLen = arr.length

    function callAsync(funct){
     debugger;
     
      if(Array.isArray(funct)){
      
      funct.forEach((item) => {
        item();
      })
      }
      else {
        
        funct(() => {
      if( i + 1 < arrLen){
        callAsync(arr[++i])
      }
      else {
        console.log('Sab khatam');
      }   
      });
      }
     
    }

    callAsync(arr[0]);
    }

}
var task_runner = new TaskRunner();

task_runner.run([task1, task2]);
