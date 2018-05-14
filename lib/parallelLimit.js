var asyncSeries = require('./series');

module.exports = function(tasks,limit,callback){
  let i =0;
  let arrayData = [];
  let objData = {};
  let allTasks = tasks.length;
  let tasksPopped = [];
  let tasksRemaining = tasks;
  let counter = 0;
  let indexBufferCount= 0 ;

  // Middleware setup for achieving redudant callbacks to origin  
  function middlewareCallback(data){
    console.log('data.length ,allTasks',data.length,allTasks)
    while(data.length === allTasks){
      callback(null,data);
      return;
    }
  }
  function runParallelLimit(counter){

    // check if task is available
    if(tasksRemaining.length > 0){
      console.log('l:li',tasksRemaining.length,limit)
      if(tasksRemaining.length >= limit){
        
        // To run all functions till limit pointer hits
        // as concurrency limit will be expected
        console.log('Next , limit:'+ limit + ' functions' + ' and counter' + counter);
        for(let j = 0;j<=limit - 1;j++){
          if(j === limit - 1){
            // popping off all those tasks in queue for expected limit
            tasksRemaining[j]((err,data) => {
              if(err){
                callback(err,null);
              } else{
                tasksPopped.push(tasksRemaining[j]);
                counter++;
                arrayData.splice(indexBufferCount,0,data);
                indexBufferCount++;
                // console.log('ArrayData',arrayData);
                console.log('Tasks Popped',tasksPopped.length,' and tasks remaining ',tasksRemaining.length);
                middlewareCallback(arrayData);
                tasksRemaining.splice(0,limit);
                runParallelLimit(counter);
              }
            })
          } else{
            // execute functions till limit number
            tasksRemaining[j]((err,data) => {
              tasksPopped.push(tasksRemaining[j]);
              arrayData.splice(indexBufferCount,0,data);
              indexBufferCount++;
              console.log('ArrayData',arrayData,indexBufferCount);
              middlewareCallback(arrayData);
              
            }) 
          }
        }
      }
      else{
        // that same parallel approach

        // Using series utility to perform remaining operations
        asyncSeries(tasksRemaining,function(err, results) {
          if (err) {
            console.log('Err:',err);
            callback(err,null);
          }
          else {
            var newData = results.forEach((item,index) => {
              arrayData.push(item);
              indexBufferCount++;
            })
            console.log('Results asyncseries ',arrayData);
            middlewareCallback(arrayData);
          }
          // results is now equal to ['one', 'two']
        });
      }
      
    } else{
      return ;
    }

  }

  runParallelLimit(counter)
}